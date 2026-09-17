import {
    FLEET_COUNTS,
    SIZE,
    SVG_MARKUP,
    WAREHOUSE_ACTIVITY_COUNT,
} from './warehouse-assets.js';

export { WAREHOUSE_ACTIVITY_COUNT };

let animationFrame = 0;
let actors = [];
let reducedMotion = false;
let pairCooldown = new Map();

export function mountWarehouseActivity() {
    unmountWarehouseActivity();

    const layer = document.createElement('div');
    layer.className = 'c-home-activity';
    layer.setAttribute('aria-hidden', 'true');
    layer.dataset.count = String(WAREHOUSE_ACTIVITY_COUNT);

    reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    const arena = getHeroArena();
    const types = buildFleet();
    const groundLanes = laneYs(types, arena);
    let collectorSlot = 0;

    actors = types.map((type, index) => {
        const actor = createActor(
            type,
            index,
            arena,
            groundLanes,
            collectorSlot
        );

        if (actor.isCollector) {
            collectorSlot += 1;
        }

        return actor;
    });

    actors.forEach(actor => layer.append(actor.element));
    document.body.prepend(layer);

    if (!reducedMotion) {
        animationFrame = requestAnimationFrame(tick);
    } else {
        actors.forEach(actor => applyTransform(actor));
    }
}

export function unmountWarehouseActivity() {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    actors = [];
    pairCooldown = new Map();
    document.querySelector('.c-home-activity')?.remove();
}

function buildFleet() {
    return Object.entries(FLEET_COUNTS).flatMap(
        ([type, count]) => Array.from({ length: count }, () => type)
    );
}

function createActor(type, index, arena, groundLanes, collectorSlot = 0) {
    const { width, height } = SIZE[type];
    const template = document.createElement('template');
    template.innerHTML = SVG_MARKUP[type].trim();
    const element = template.content.firstElementChild;
    element.style.width = `${width}px`;

    const isCollector = type === 'pallet-jack' || type === 'pallet';

    if (isCollector) {
        element.classList.add('is-collector');
    }

    const flies = type === 'package';
    const bounds = arena.outer;
    const usableWidth = Math.max(bounds.right - bounds.left - width, 1);
    const minY = bounds.top + 16;
    const maxY = bounds.bottom - height - 12;
    const direction = index % 2 === 0 ? 1 : -1;
    const speedTick = index % 8;
    const spawn = flies
        ? spawnAroundHero(index, arena, width, height)
        : {
            x: bounds.left + ((index * 0.37) % 1) * usableWidth,
            y: groundLanes[index] ?? minY,
        };

    const actor = {
        element,
        type,
        flies,
        width,
        height,
        laneY: flies ? spawn.y : (groundLanes[index] ?? spawn.y),
        x: spawn.x,
        y: spawn.y,
        minY,
        maxY,
        vx: direction * (flies ? 10 + speedTick * 3 : 7 + speedTick * 2),
        vy: flies
            ? ((index % 2 === 0 ? -1 : 1) * (5 + (index % 5) * 2))
            : 0,
        rotation: flies ? (index * 10) % 16 - 8 : 0,
        spin: flies ? 3 + speedTick : 0,
        scale: 1,
        facing: isCollector
            ? 1
            : (type === 'forklift' ? (direction < 0 ? 1 : -1) : direction),
        isCollector,
        orbitAngle: isCollector
            ? (collectorSlot / Math.max(collectorTotal(), 1)) * Math.PI * 2
            : 0,
        orbitSpeed: isCollector ? 0.09 + collectorSlot * 0.02 : 0,
        orbitDirection: 1,
        orbitScale: isCollector ? 0.62 + collectorSlot * 0.34 : 1,
        carrier: null,
        target: null,
        heldUntil: 0,
        releaseUntil: 0,
        collidingUntil: 0,
        cooldownUntil: 0,
        dumpUntil: 0,
        orbitNudge: 0,
        scatterUntil: 0,
        id: index,
        stackIndex: 0,
        yielding: false,
    };

    if (isCollector) {
        placeOnOrbit(actor, arena, 0);
    }

    return actor;
}

function collectorTotal() {
    return FLEET_COUNTS['pallet-jack'] + FLEET_COUNTS.pallet;
}

function laneYs(types, arena) {
    const outer = arena.outer;
    const inner = arena.inner;
    const groundIndexes = types
        .map((type, index) => (
            type === 'package' || type === 'pallet-jack' || type === 'pallet'
                ? -1
                : index
        ))
        .filter(index => index >= 0);

    const lanes = {};

    groundIndexes.forEach((index, lane) => {
        const height = SIZE[types[index]].height;
        const minY = outer.top + 12;
        const maxY = outer.bottom - height - 12;

        if (inner) {
            const topBand = clamp(inner.top - height - 18, minY, maxY);
            const bottomBand = clamp(inner.bottom + 14, minY, maxY);
            lanes[index] = lane % 2 === 0 ? topBand : bottomBand;
            return;
        }

        const spread = groundIndexes.length === 1
            ? 0.5
            : lane / (groundIndexes.length - 1);

        lanes[index] = minY + spread * Math.max(maxY - minY, 0);
    });

    return lanes;
}

function getPageBounds() {
    const header = document.querySelector('#site-header');
    const footer = document.querySelector('.c-site-footer');
    const mobileNav = document.querySelector('#mobile-navigation');

    const top = header
        ? header.getBoundingClientRect().bottom
        : 72;

    const footerTop = footer
        ? footer.getBoundingClientRect().top
        : window.innerHeight;

    const mobileNavVisible = mobileNav
        && getComputedStyle(mobileNav).display !== 'none';

    const mobileNavHeight = mobileNavVisible
        ? mobileNav.getBoundingClientRect().height
        : 0;

    return {
        left: 24,
        right: window.innerWidth - 24,
        top,
        bottom: Math.min(
            footerTop,
            window.innerHeight - mobileNavHeight
        ),
    };
}

function getHeroArena() {
    const page = getPageBounds();
    const hero = document.querySelector('.c-hero__content');

    if (!hero) {
        return { outer: page, inner: null };
    }

    const box = hero.getBoundingClientRect();
    const padX = Math.max(118, Math.min(box.width * 0.18, 200));
    const padY = Math.max(108, Math.min(box.height * 0.26, 190));

    const outer = {
        left: Math.max(page.left, box.left - padX),
        right: Math.min(page.right, box.right + padX),
        top: Math.max(page.top, box.top - padY),
        bottom: Math.min(page.bottom, box.bottom + padY),
    };

    if (outer.right - outer.left < 260) {
        const extra = (260 - (outer.right - outer.left)) / 2;
        outer.left = Math.max(page.left, outer.left - extra);
        outer.right = Math.min(page.right, outer.right + extra);
    }

    if (outer.bottom - outer.top < 220) {
        const extra = (220 - (outer.bottom - outer.top)) / 2;
        outer.top = Math.max(page.top, outer.top - extra);
        outer.bottom = Math.min(page.bottom, outer.bottom + extra);
    }

    const inner = {
        left: box.left,
        right: box.right,
        top: Math.max(box.top, outer.top + 10),
        bottom: Math.min(box.bottom, outer.bottom - 10),
    };

    const ringReady = inner.right > inner.left + 48
        && inner.bottom > inner.top + 48
        && inner.left < outer.right
        && inner.right > outer.left
        && inner.top < outer.bottom
        && inner.bottom > outer.top;

    return {
        outer,
        inner: ringReady ? inner : null,
    };
}

function spawnAroundHero(index, arena, width, height) {
    const { outer, inner } = arena;

    if (!inner) {
        return {
            x: outer.left + ((index * 0.6180339887) % 1)
                * Math.max(outer.right - outer.left - width, 1),
            y: outer.top + ((index * 0.3819660113) % 1)
                * Math.max(outer.bottom - outer.top - height, 1),
        };
    }

    const side = index % 4;
    const t = (index * 0.6180339887) % 1;

    if (side === 0) {
        return {
            x: clamp(
                inner.left + t * (inner.right - inner.left) - width / 2,
                outer.left,
                outer.right - width
            ),
            y: clamp(
                (outer.top + inner.top) / 2 - height / 2,
                outer.top,
                Math.max(outer.top, inner.top - height)
            ),
        };
    }

    if (side === 1) {
        return {
            x: clamp(
                (inner.right + outer.right) / 2 - width / 2,
                inner.right,
                outer.right - width
            ),
            y: clamp(
                inner.top + t * (inner.bottom - inner.top) - height / 2,
                outer.top,
                outer.bottom - height
            ),
        };
    }

    if (side === 2) {
        return {
            x: clamp(
                inner.left + t * (inner.right - inner.left) - width / 2,
                outer.left,
                outer.right - width
            ),
            y: clamp(
                (inner.bottom + outer.bottom) / 2 - height / 2,
                inner.bottom,
                outer.bottom - height
            ),
        };
    }

    return {
        x: clamp(
            (outer.left + inner.left) / 2 - width / 2,
            outer.left,
            Math.max(outer.left, inner.left - width)
        ),
        y: clamp(
            inner.top + t * (inner.bottom - inner.top) - height / 2,
            outer.top,
            outer.bottom - height
        ),
    };
}

function bounceFromInner(actor, inner) {
    if (!inner || !overlapsRect(actor, inner)) {
        return;
    }

    const overlapLeft = actor.x + actor.width - inner.left;
    const overlapRight = inner.right - actor.x;
    const overlapTop = actor.y + actor.height - inner.top;
    const overlapBottom = inner.bottom - actor.y;
    const minX = Math.min(overlapLeft, overlapRight);
    const minY = Math.min(overlapTop, overlapBottom);

    if (minX < minY) {
        if (overlapLeft < overlapRight) {
            actor.x = inner.left - actor.width;
            if (actor.vx > 0) {
                actor.vx = -Math.abs(actor.vx || 36);
            }
        } else {
            actor.x = inner.right;
            if (actor.vx < 0) {
                actor.vx = Math.abs(actor.vx || 36);
            }
        }
    } else if (overlapTop < overlapBottom) {
        actor.y = inner.top - actor.height;
        if (actor.vy > 0) {
            actor.vy = -Math.abs(actor.vy || 28);
        }
    } else {
        actor.y = inner.bottom;
        if (actor.vy < 0) {
            actor.vy = Math.abs(actor.vy || 28);
        }
    }
}

function overlapsRect(actor, rect) {
    return actor.x < rect.right
        && actor.x + actor.width > rect.left
        && actor.y < rect.bottom
        && actor.y + actor.height > rect.top;
}

function tick(timestamp) {
    const arena = getHeroArena();
    const bounds = arena.outer;
    const delta = Math.min(0.032, 1 / 60);
    const collectors = actors.filter(actor => actor.isCollector);

    actors.forEach(actor => {
        actor.maxY = bounds.bottom - actor.height - 12;
        actor.minY = bounds.top + 16;
    });

    collectors.forEach(collector => {
        placeOnOrbit(collector, arena, delta);
    });

    if (collectors.length > 0) {
        giveWayToCollectors(collectors);
    }

    actors.forEach(actor => {
        if (actor.carrier) {
            return;
        }

        if (!actor.flies && !actor.isCollector) {
            if (actor.yielding) {
                actor.spin *= 0.8;
            } else {
                actor.vy *= 0.72;
                actor.y += (actor.laneY - actor.y) * 0.08;
                actor.spin *= 0.8;
            }
        }

        if (actor.isCollector) {
            actor.facing = 1;
            actor.rotation = 0;
            actor.spin = 0;
            applyCollectorScale(actor);
            if (timestamp > actor.collidingUntil) {
                actor.element.classList.remove('is-colliding');
            }
            return;
        }

        actor.x += actor.vx * delta;
        actor.y += actor.vy * delta;
        actor.rotation += actor.spin * delta;
        actor.spin *= actor.flies ? 0.985 : 0.86;

        if (actor.flies) {
            actor.spin += Math.sin(timestamp / 1400 + actor.x) * 2 * delta;
        }

        if (actor.x <= bounds.left) {
            actor.x = bounds.left;
            if (actor.vx < 0) {
                actor.vx *= -1;
            }
        } else if (actor.x >= bounds.right - actor.width) {
            actor.x = bounds.right - actor.width;
            if (actor.vx > 0) {
                actor.vx *= -1;
            }
        }

        if (actor.flies) {
            if (actor.y <= actor.minY) {
                actor.y = actor.minY;
                if (actor.vy < 0) {
                    actor.vy *= -1;
                }
            } else if (actor.y >= actor.maxY) {
                actor.y = actor.maxY;
                if (actor.vy > 0) {
                    actor.vy *= -1;
                }
            }

            bounceFromInner(actor, arena.inner);
        } else {
            actor.y = clamp(actor.y, actor.minY, actor.maxY);
        }

        if (actor.vx !== 0) {
            actor.facing = actor.type === 'forklift'
                ? (actor.vx < 0 ? 1 : -1)
                : (actor.vx > 0 ? 1 : -1);
        }

        const depth = (actor.y - actor.minY)
            / Math.max(actor.maxY - actor.minY, 1);

        actor.scale = actor.flies
            ? 0.9 - depth * 0.06
            : 0.96 - depth * 0.1;

        if (timestamp > actor.collidingUntil) {
            actor.element.classList.remove('is-colliding');
        }
    });

    collectors.forEach(collector => {
        collectPackages(collector, timestamp);
        placeCargo(collector);
    });

    resolveCollisions(timestamp, bounds);
    actors.forEach(actor => applyTransform(actor));
    animationFrame = requestAnimationFrame(tick);
}

function resolveCollisions(timestamp, bounds) {
    for (let index = 0; index < actors.length; index += 1) {
        for (let next = index + 1; next < actors.length; next += 1) {
            const first = actors[index];
            const second = actors[next];

            if (first.carrier || second.carrier) {
                continue;
            }

            if (
                (first.isCollector && second.flies)
                || (second.isCollector && first.flies)
            ) {
                continue;
            }

            if (!overlaps(actorBox(first), actorBox(second))) {
                continue;
            }

            const freshHit = timestamp >= first.cooldownUntil
                && timestamp >= second.cooldownUntil;

            if (first.isCollector && second.isCollector) {
                if (freshHit) {
                    dropCargo(first, timestamp);
                    dropCargo(second, timestamp);
                    staggerCollectorOrbits(first, second);
                    lockCollision(first, second, timestamp, 1600);
                }
                continue;
            }

            if (first.isCollector || second.isCollector) {
                const collector = first.isCollector ? first : second;
                const other = first.isCollector ? second : first;

                deflectVehicle(other, collector, bounds);

                if (freshHit) {
                    dropCargo(collector, timestamp);
                    lockCollision(collector, other, timestamp, 1400);
                }
                continue;
            }

            if (!first.flies && !second.flies) {
                separateVehicles(first, second, bounds, 18);

                if (freshHit && headingTowards(first, second)) {
                    first.vx *= -1;
                    second.vx *= -1;
                    lockCollision(first, second, timestamp, 1200);
                }
                continue;
            }

            const packageHitsVehicle = first.flies !== second.flies;

            if (packageHitsVehicle) {
                bouncePackageOffVehicle(first, second, bounds, freshHit);
                if (freshHit) {
                    const flyer = first.flies ? first : second;
                    flyer.cooldownUntil = timestamp + 500;
                }
                continue;
            }

            const pairReady = timestamp >= (
                pairCooldown.get(pairId(first, second)) || 0
            );

            bouncePackages(first, second, bounds, pairReady, timestamp);

            if (pairReady) {
                pairCooldown.set(pairId(first, second), timestamp + 1000);
                first.collidingUntil = timestamp + 280;
                second.collidingUntil = timestamp + 280;
            }
        }
    }
}

function lockCollision(first, second, timestamp, duration) {
    first.cooldownUntil = timestamp + duration;
    second.cooldownUntil = timestamp + duration;
}

function placeOnOrbit(collector, arena, delta) {
    collector.orbitAngle += collector.orbitSpeed
        * collector.orbitDirection
        * delta;

    const turn = Math.PI * 2;
    collector.orbitAngle = ((collector.orbitAngle % turn) + turn) % turn;

    const orbit = getCollectorOrbit(collector, arena);
    const angle = collector.orbitAngle;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const radius = orbitRadius(angle, orbit) + collector.orbitNudge;
    collector.orbitNudge *= 0.94;

    if (collector.orbitNudge < 1.5) {
        collector.orbitNudge = 0;
    }

    collector.x = orbit.cx + cosine * radius - collector.width / 2;
    collector.y = orbit.cy + sine * radius - collector.height / 2;
    collector.vx = -sine * radius * collector.orbitSpeed * collector.orbitDirection;
    collector.vy = cosine * radius * collector.orbitSpeed * collector.orbitDirection;
    collector.facing = 1;
    collector.rotation = 0;
    collector.spin = 0;
    applyCollectorScale(collector);
}

function getCollectorOrbit(collector, arena) {
    const { outer, inner } = arena;
    const ring = inner || outer;
    const clearance = Math.max(collector.width, collector.height) * 0.5
        + 18
        + (collector.orbitScale - 0.62) * 140;

    return {
        cx: (ring.left + ring.right) / 2,
        cy: (ring.top + ring.bottom) / 2,
        innerHalfW: Math.max((ring.right - ring.left) / 2, 1),
        innerHalfH: Math.max((ring.bottom - ring.top) / 2, 1),
        radius: clearance,
        outer,
        width: collector.width,
        height: collector.height,
    };
}

function orbitRadius(angle, orbit) {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const around = roundedRectRadius(
        cosine,
        sine,
        orbit.innerHalfW,
        orbit.innerHalfH,
        orbit.radius
    );
    const circular = Math.hypot(orbit.innerHalfW, orbit.innerHalfH)
        + orbit.radius;
    const limit = rayToBounds(
        cosine,
        sine,
        orbit.outer,
        orbit.cx,
        orbit.cy,
        orbit.width,
        orbit.height
    );
    const blended = around + (circular - around) * 0.55;

    return Math.min(blended, limit);
}

function roundedRectRadius(cosine, sine, halfW, halfH, offset) {
    const absC = Math.max(Math.abs(cosine), 1e-6);
    const absS = Math.max(Math.abs(sine), 1e-6);
    const toBox = Math.min((halfW + offset) / absC, (halfH + offset) / absS);
    const hitX = cosine * toBox;
    const hitY = sine * toBox;
    const inCorner = Math.abs(hitX) > halfW && Math.abs(hitY) > halfH;

    if (!inCorner) {
        return toBox;
    }

    const ox = Math.sign(cosine) * halfW;
    const oy = Math.sign(sine) * halfH;
    const aligned = 2 * (cosine * ox + sine * oy);
    const discriminant = Math.max(
        aligned * aligned - 4 * (ox * ox + oy * oy - offset * offset),
        0
    );

    return (aligned + Math.sqrt(discriminant)) / 2;
}

function rayToBounds(cosine, sine, outer, cx, cy, width, height) {
    const edgeX = cosine >= 0
        ? outer.right - width / 2
        : outer.left + width / 2;
    const edgeY = sine >= 0
        ? outer.bottom - height / 2
        : outer.top + height / 2;
    const tx = (edgeX - cx) / (Math.abs(cosine) < 1e-6 ? 1e-6 : cosine);
    const ty = (edgeY - cy) / (Math.abs(sine) < 1e-6 ? 1e-6 : sine);

    return Math.max(48, Math.min(tx, ty) - 10);
}

function applyCollectorScale(actor) {
    const depth = (actor.y - actor.minY)
        / Math.max(actor.maxY - actor.minY, 1);

    actor.scale = 1.02 - depth * 0.08;
}

function collectPackages(collector, timestamp) {
    if (timestamp < collector.dumpUntil) {
        return;
    }

    const load = carriedPackages(collector);

    if (load.length >= maxStack(collector)) {
        return;
    }

    const fork = forkPoint(collector);

    freePackages(timestamp).forEach(pkg => {
        const dx = (pkg.x + pkg.width / 2) - fork.x;
        const dy = (pkg.y + pkg.height / 2) - fork.y;
        const distance = Math.hypot(dx, dy);

        if (timestamp >= pkg.scatterUntil && distance < 64 && distance > 36) {
            pkg.vx += -dx * 0.012;
            pkg.vy += -dy * 0.012;
        }

        if (distance <= 36 && carriedPackages(collector).length < maxStack(collector)) {
            catchPackage(pkg, collector, timestamp);
        }
    });
}

function placeCargo(collector) {
    const deck = cargoDeck(collector);
    const step = SIZE.package.height - 6;

    carriedPackages(collector)
        .sort((left, right) => left.stackIndex - right.stackIndex)
        .forEach((pkg, stack) => {
            pkg.x = deck.x - pkg.width / 2;
            pkg.y = deck.y - pkg.height - stack * step;
            pkg.vx = 0;
            pkg.vy = 0;
            pkg.spin = 0;
            pkg.rotation = 0;
            pkg.facing = 1;
            pkg.scale = collector.scale;
            pkg.element.style.zIndex = String(4 + stack);
        });
}

function catchPackage(pkg, collector, timestamp) {
    if (pkg.carrier) {
        return;
    }

    pkg.carrier = collector;
    pkg.target = null;
    pkg.stackIndex = carriedPackages(collector).length - 1;
    pkg.heldUntil = 0;
    pkg.rotation = 0;
    pkg.spin = 0;
    pkg.element.classList.add('is-carried');
    collector.element.classList.add('is-collecting');
    collector.target = null;
}

function releasePackage(pkg, collector, timestamp) {
    const toss = collector.vx >= 0 ? 1 : -1;

    pkg.carrier = null;
    pkg.releaseUntil = timestamp + 1600;
    pkg.heldUntil = 0;
    pkg.vx = toss * (16 + Math.random() * 10);
    pkg.vy = -18 - Math.random() * 10;
    pkg.spin = toss * 40;
    pkg.element.classList.remove('is-carried');

    if (collector.target === pkg) {
        collector.target = null;
    }

    if (carriedPackages(collector).length === 0) {
        collector.element.classList.remove('is-collecting');
    }
}

function dropCargo(collector, timestamp) {
    const cargo = carriedPackages(collector);

    if (cargo.length === 0) {
        return;
    }

    cargo
        .sort((left, right) => left.stackIndex - right.stackIndex)
        .forEach((pkg, index) => {
            const scatter = index - (cargo.length - 1) / 2;

            pkg.carrier = null;
            pkg.stackIndex = 0;
            pkg.releaseUntil = timestamp + 900;
            pkg.heldUntil = 0;
            pkg.vx = collector.vx * 0.12 + scatter * 10;
            pkg.vy = -14 - Math.abs(scatter) * 3;
            pkg.spin = scatter * 18;
            pkg.rotation = scatter * 4;
            pkg.element.classList.remove('is-carried');
            pkg.element.style.zIndex = '';
            pkg.scatterUntil = timestamp + 900;
        });

    collector.target = null;
    collector.dumpUntil = timestamp + 1400;
    collector.element.classList.remove('is-collecting');
}

function cargoDeck(collector) {
    if (collector.type === 'pallet') {
        return {
            x: collector.x + collector.width / 2,
            y: collector.y + collector.height - 14,
        };
    }

    return {
        x: collector.x + collector.width - 30,
        y: collector.y + collector.height - 16,
    };
}

function maxStack(collector) {
    const step = SIZE.package.height - 6;
    const deck = cargoDeck(collector);
    const available = deck.y - collector.minY - SIZE.package.height;

    return Math.max(1, Math.min(8, Math.floor(available / step)));
}

function bouncePackageOffVehicle(first, second, bounds, shouldReverse) {
    const flyer = first.flies ? first : second;
    const vehicle = first.flies ? second : first;

    if (shouldReverse) {
        flyer.vx *= -1;
        flyer.vy *= -1;
    }

    separateVehicles(flyer, vehicle, bounds, 14, {
        moveFirst: true,
        moveSecond: false,
    });
    flyer.y = clamp(flyer.y, flyer.minY, flyer.maxY);
}

function giveWayToCollectors(collectors) {
    actors.forEach(actor => {
        if (actor.isCollector || actor.carrier || actor.flies) {
            actor.yielding = false;
            return;
        }

        const blocking = collectors.find(collector =>
            overlapsRects(actor, collectorPath(collector))
        );

        if (!blocking) {
            actor.yielding = false;
            return;
        }

        actor.yielding = true;

        const away = Math.sign(
            (actor.x + actor.width / 2)
            - (blocking.x + blocking.width / 2)
        ) || 1;

        if (Math.sign(actor.vx) !== away) {
            actor.vx = away * Math.max(Math.abs(actor.vx), 26);
        }
    });
}

function collectorPath(collector) {
    const lookX = collector.vx * 0.35;
    const lookY = collector.vy * 0.35;
    const pad = 36;

    return {
        x: collector.x + Math.min(0, lookX) - pad,
        y: collector.y + Math.min(0, lookY) - pad,
        width: collector.width + Math.abs(lookX) + pad * 2,
        height: collector.height + Math.abs(lookY) + pad * 2,
    };
}

function overlapsRects(first, second) {
    return first.x < second.x + second.width
        && first.x + first.width > second.x
        && first.y < second.y + second.height
        && first.y + first.height > second.y;
}

function freePackages(timestamp) {
    return actors.filter(actor =>
        actor.flies
        && !actor.carrier
        && timestamp >= actor.releaseUntil
    );
}

function carriedPackages(collector) {
    return actors.filter(actor => actor.carrier === collector);
}

function forkPoint(collector) {
    if (collector.type === 'pallet') {
        return {
            x: collector.x + collector.width / 2,
            y: collector.y + 8,
        };
    }

    return {
        x: collector.x + collector.width - 27,
        y: collector.y + 13,
    };
}

function staggerCollectorOrbits(first, second) {
    const outer = first.orbitScale >= second.orbitScale ? first : second;
    const inner = outer === first ? second : first;

    outer.orbitNudge = Math.max(outer.orbitNudge, 64);
    inner.orbitNudge = Math.max(0, inner.orbitNudge - 10);
    outer.orbitAngle += 0.1;
}

function pairId(first, second) {
    return first.id < second.id
        ? `${first.id}:${second.id}`
        : `${second.id}:${first.id}`;
}

function bouncePackages(first, second, bounds, shouldDeflect, timestamp) {
    const ax = first.x + first.width / 2;
    const ay = first.y + first.height / 2;
    const bx = second.x + second.width / 2;
    const by = second.y + second.height / 2;
    let dx = ax - bx;
    let dy = ay - by;
    let distance = Math.hypot(dx, dy);

    if (distance < 1) {
        dx = first.id <= second.id ? 1 : -1;
        dy = 0.35;
        distance = Math.hypot(dx, dy);
    }

    dx /= distance;
    dy /= distance;

    const minDist = (first.width + second.width) / 2 + 16;
    const push = Math.max(minDist - distance, 10) / 2;

    first.x += dx * push;
    first.y += dy * push;
    second.x -= dx * push;
    second.y -= dy * push;

    if (shouldDeflect) {
        const speed = 22;
        first.vx = dx * speed;
        first.vy = dy * speed;
        second.vx = -dx * speed;
        second.vy = -dy * speed;
        first.spin *= 0.35;
        second.spin *= 0.35;
        first.scatterUntil = timestamp + 800;
        second.scatterUntil = timestamp + 800;
    }

    first.x = clamp(first.x, bounds.left, bounds.right - first.width);
    second.x = clamp(second.x, bounds.left, bounds.right - second.width);
    first.y = clamp(first.y, first.minY, first.maxY);
    second.y = clamp(second.y, second.minY, second.maxY);
}

function deflectVehicle(vehicle, collector, bounds) {
    const minX = bounds.left;
    const maxX = bounds.right - vehicle.width;
    let away = Math.sign(
        (vehicle.x + vehicle.width / 2)
        - (collector.x + collector.width / 2)
    ) || 1;
    const roomAway = away < 0 ? vehicle.x - minX : maxX - vehicle.x;

    if (roomAway < 28) {
        away = Math.sign(collector.vx) || -away;
    }

    vehicle.vx = away * Math.max(Math.abs(vehicle.vx), 22);
    vehicle.vy = 0;
    separateVehicles(vehicle, collector, bounds, 20, {
        moveFirst: true,
        moveSecond: false,
    });
}

function headingTowards(first, second) {
    return (first.vx - second.vx) * (first.x - second.x) < 0;
}

function separateVehicles(first, second, bounds, gap = 12, options = {}) {
    const moveFirst = options.moveFirst !== false;
    const moveSecond = options.moveSecond !== false;
    const boxA = actorBox(first);
    const boxB = actorBox(second);
    const overlapX = Math.min(boxA.x + boxA.width, boxB.x + boxB.width)
        - Math.max(boxA.x, boxB.x);
    const overlapY = Math.min(boxA.y + boxA.height, boxB.y + boxB.height)
        - Math.max(boxA.y, boxB.y);

    if (overlapX <= 0 || overlapY <= 0) {
        return;
    }

    const groundPair = !first.flies && !second.flies;
    const alongX = groundPair || overlapX <= overlapY;
    const shares = (moveFirst ? 1 : 0) + (moveSecond ? 1 : 0) || 1;

    if (alongX) {
        const step = (overlapX + gap) / shares;

        if (boxA.x <= boxB.x) {
            if (moveFirst) {
                first.x -= step;
            }
            if (moveSecond) {
                second.x += step;
            }
        } else {
            if (moveFirst) {
                first.x += step;
            }
            if (moveSecond) {
                second.x -= step;
            }
        }
    } else {
        const step = (overlapY + gap) / shares;

        if (boxA.y <= boxB.y) {
            if (moveFirst) {
                first.y -= step;
            }
            if (moveSecond) {
                second.y += step;
            }
        } else {
            if (moveFirst) {
                first.y += step;
            }
            if (moveSecond) {
                second.y -= step;
            }
        }
    }

    const firstMin = bounds.left;
    const firstMax = bounds.right - first.width;
    const secondMin = bounds.left;
    const secondMax = bounds.right - second.width;

    if (moveFirst && first.x < firstMin) {
        const overflow = firstMin - first.x;
        first.x = firstMin;
        if (moveSecond) {
            second.x += overflow;
        }
    } else if (moveFirst && first.x > firstMax) {
        const overflow = first.x - firstMax;
        first.x = firstMax;
        if (moveSecond) {
            second.x -= overflow;
        }
    }

    if (moveSecond && second.x < secondMin) {
        const overflow = secondMin - second.x;
        second.x = secondMin;
        if (moveFirst) {
            first.x = clamp(first.x + overflow, firstMin, firstMax);
        }
    } else if (moveSecond && second.x > secondMax) {
        const overflow = second.x - secondMax;
        second.x = secondMax;
        if (moveFirst) {
            first.x = clamp(first.x - overflow, firstMin, firstMax);
        }
    }

    first.x = clamp(first.x, firstMin, firstMax);
    second.x = clamp(second.x, secondMin, secondMax);
    first.y = clamp(first.y, first.minY, first.maxY);
    second.y = clamp(second.y, second.minY, second.maxY);
}

function actorBox(actor) {
    if (!actor.isCollector) {
        return actor;
    }

    const cargo = carriedPackages(actor);

    if (cargo.length === 0) {
        return actor;
    }

    let left = actor.x;
    let top = actor.y;
    let right = actor.x + actor.width;
    let bottom = actor.y + actor.height;

    cargo.forEach(pkg => {
        left = Math.min(left, pkg.x);
        top = Math.min(top, pkg.y);
        right = Math.max(right, pkg.x + pkg.width);
        bottom = Math.max(bottom, pkg.y + pkg.height);
    });

    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
    };
}

function overlaps(first, second) {
    return first.x < second.x + second.width - 10
        && first.x + first.width - 10 > second.x
        && first.y < second.y + second.height - 10
        && first.y + first.height - 10 > second.y;
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function applyTransform(actor) {
    const facing = actor.flies || actor.isCollector ? 1 : actor.facing;
    const rotation = actor.isCollector ? 0 : actor.rotation;
    actor.element.style.transform =
        `translate(${actor.x}px, ${actor.y}px)`
        + ` scale(${actor.scale * facing}, ${actor.scale})`
        + ` rotate(${rotation}deg)`;
}

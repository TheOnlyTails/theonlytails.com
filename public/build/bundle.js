(function (l, r) {
    if (l.getElementById('livereloadscript')) return;
    r = l.createElement('script');
    r.async = 1;
    r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1';
    r.id = 'livereloadscript';
    l.getElementsByTagName('head')[0].appendChild(r)
})(window.document);
var app = (function () {
    'use strict';

    function noop() {
    }

    const identity = x => x;

    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: {file, line, column, char}
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = {c: callback, f: fulfill});
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = node.ownerDocument;
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const null_transition = {duration: 0};
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = program.b - t;
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const {delay = 0, duration = 300, easing = identity, tick = noop, css} = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            } else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                } else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        } else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                } else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const {fragment, on_mount, on_destroy, after_update} = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                } else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({version: '3.37.0'}, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', {target, node});
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', {target, node, anchor});
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', {node});
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', {node, event, handler, modifiers});
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', {node, event, handler, modifiers});
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', {node, attribute});
        else
            dispatch_dev('SvelteDOMSetAttribute', {node, attribute, value});
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', {node: text, data});
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }

        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }

        $capture_state() {
        }

        $inject_state() {
        }
    }

    /* src\SocialIcon.svelte generated by Svelte v3.37.0 */

    const file$2 = "src\\SocialIcon.svelte";

    function create_fragment$2(ctx) {
        let a;
        let img;
        let img_src_value;

        const block = {
            c: function create() {
                a = element("a");
                img = element("img");
                attr_dev(img, "alt", /*alt*/ ctx[6]);
                attr_dev(img, "class", "social");
                attr_dev(img, "height", /*size*/ ctx[2]);
                attr_dev(img, "id", /*id*/ ctx[4]);
                if (img.src !== (img_src_value = /*src*/ ctx[5])) attr_dev(img, "src", img_src_value);
                attr_dev(img, "style", /*style*/ ctx[3]);
                attr_dev(img, "width", /*size*/ ctx[2]);
                add_location(img, file$2, 11, 2, 381);
                attr_dev(a, "class", "social");
                attr_dev(a, "href", /*href*/ ctx[0]);
                attr_dev(a, "title", /*title*/ ctx[1]);
                add_location(a, file$2, 9, 0, 279);
            },
            l: function claim(nodes) {
                throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
            },
            m: function mount(target, anchor) {
                insert_dev(target, a, anchor);
                append_dev(a, img);
            },
            p: function update(ctx, [dirty]) {
                if (dirty & /*alt*/ 64) {
                    attr_dev(img, "alt", /*alt*/ ctx[6]);
                }

                if (dirty & /*size*/ 4) {
                    attr_dev(img, "height", /*size*/ ctx[2]);
                }

                if (dirty & /*id*/ 16) {
                    attr_dev(img, "id", /*id*/ ctx[4]);
                }

                if (dirty & /*src*/ 32 && img.src !== (img_src_value = /*src*/ ctx[5])) {
                    attr_dev(img, "src", img_src_value);
                }

                if (dirty & /*style*/ 8) {
                    attr_dev(img, "style", /*style*/ ctx[3]);
                }

                if (dirty & /*size*/ 4) {
                    attr_dev(img, "width", /*size*/ ctx[2]);
                }

                if (dirty & /*href*/ 1) {
                    attr_dev(a, "href", /*href*/ ctx[0]);
                }

                if (dirty & /*title*/ 2) {
                    attr_dev(a, "title", /*title*/ ctx[1]);
                }
            },
            i: noop,
            o: noop,
            d: function destroy(detaching) {
                if (detaching) detach_dev(a);
            }
        };

        dispatch_dev("SvelteRegisterBlock", {
            block,
            id: create_fragment$2.name,
            type: "component",
            source: "",
            ctx
        });

        return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
        let id;
        let src;
        let alt;
        let {$$slots: slots = {}, $$scope} = $$props;
        validate_slots("SocialIcon", slots, []);
        let {href} = $$props;
        let {title} = $$props;
        let {size = 32} = $$props;
        let {style = ""} = $$props;
        const writable_props = ["href", "title", "size", "style"];

        Object.keys($$props).forEach(key => {
            if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SocialIcon> was created with unknown prop '${key}'`);
        });

        $$self.$$set = $$props => {
            if ("href" in $$props) $$invalidate(0, href = $$props.href);
            if ("title" in $$props) $$invalidate(1, title = $$props.title);
            if ("size" in $$props) $$invalidate(2, size = $$props.size);
            if ("style" in $$props) $$invalidate(3, style = $$props.style);
        };

        $$self.$capture_state = () => ({href, title, size, style, id, src, alt});

        $$self.$inject_state = $$props => {
            if ("href" in $$props) $$invalidate(0, href = $$props.href);
            if ("title" in $$props) $$invalidate(1, title = $$props.title);
            if ("size" in $$props) $$invalidate(2, size = $$props.size);
            if ("style" in $$props) $$invalidate(3, style = $$props.style);
            if ("id" in $$props) $$invalidate(4, id = $$props.id);
            if ("src" in $$props) $$invalidate(5, src = $$props.src);
            if ("alt" in $$props) $$invalidate(6, alt = $$props.alt);
        };

        if ($$props && "$$inject" in $$props) {
            $$self.$inject_state($$props.$$inject);
        }

        $$self.$$.update = () => {
            if ($$self.$$.dirty & /*title*/ 2) {
                $$invalidate(4, id = (title ? title : "Title not found").toLowerCase());
            }

            if ($$self.$$.dirty & /*id*/ 16) {
                $$invalidate(5, src = `icons/${id}.svg`);
            }

            if ($$self.$$.dirty & /*title*/ 2) {
                $$invalidate(6, alt = `the link to my ${title ? title : "Title not found"} profile`);
            }
        };

        return [href, title, size, style, id, src, alt];
    }

    class SocialIcon extends SvelteComponentDev {
        constructor(options) {
            super(options);
            init(this, options, instance$2, create_fragment$2, safe_not_equal, {href: 0, title: 1, size: 2, style: 3});

            dispatch_dev("SvelteRegisterComponent", {
                component: this,
                tagName: "SocialIcon",
                options,
                id: create_fragment$2.name
            });

            const {ctx} = this.$$;
            const props = options.props || {};

            if (/*href*/ ctx[0] === undefined && !("href" in props)) {
                console.warn("<SocialIcon> was created without expected prop 'href'");
            }

            if (/*title*/ ctx[1] === undefined && !("title" in props)) {
                console.warn("<SocialIcon> was created without expected prop 'title'");
            }
        }

        get href() {
            throw new Error("<SocialIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        set href(value) {
            throw new Error("<SocialIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        get title() {
            throw new Error("<SocialIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        set title(value) {
            throw new Error("<SocialIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        get size() {
            throw new Error("<SocialIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        set size(value) {
            throw new Error("<SocialIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        get style() {
            throw new Error("<SocialIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        set style(value) {
            throw new Error("<SocialIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }
    }

    /* src\Project.svelte generated by Svelte v3.37.0 */

    const file$1 = "src\\Project.svelte";

    function create_fragment$1(ctx) {
        let li;
        let a;
        let t0;
        let t1;
        let current;
        const default_slot_template = /*#slots*/ ctx[3].default;
        const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

        const block = {
            c: function create() {
                li = element("li");
                a = element("a");
                t0 = text(/*name*/ ctx[0]);
                t1 = text("\r\n\t\t-\r\n\t\t");
                if (default_slot) default_slot.c();
                attr_dev(a, "href", /*href*/ ctx[1]);
                add_location(a, file$1, 5, 2, 92);
                attr_dev(li, "class", "projects");
                add_location(li, file$1, 4, 0, 67);
            },
            l: function claim(nodes) {
                throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
            },
            m: function mount(target, anchor) {
                insert_dev(target, li, anchor);
                append_dev(li, a);
                append_dev(a, t0);
                append_dev(li, t1);

                if (default_slot) {
                    default_slot.m(li, null);
                }

                current = true;
            },
            p: function update(ctx, [dirty]) {
                if (!current || dirty & /*name*/ 1) set_data_dev(t0, /*name*/ ctx[0]);

                if (!current || dirty & /*href*/ 2) {
                    attr_dev(a, "href", /*href*/ ctx[1]);
                }

                if (default_slot) {
                    if (default_slot.p && dirty & /*$$scope*/ 4) {
                        update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[2], dirty, null, null);
                    }
                }
            },
            i: function intro(local) {
                if (current) return;
                transition_in(default_slot, local);
                current = true;
            },
            o: function outro(local) {
                transition_out(default_slot, local);
                current = false;
            },
            d: function destroy(detaching) {
                if (detaching) detach_dev(li);
                if (default_slot) default_slot.d(detaching);
            }
        };

        dispatch_dev("SvelteRegisterBlock", {
            block,
            id: create_fragment$1.name,
            type: "component",
            source: "",
            ctx
        });

        return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
        let {$$slots: slots = {}, $$scope} = $$props;
        validate_slots("Project", slots, ['default']);
        let {name} = $$props;
        let {href} = $$props;
        const writable_props = ["name", "href"];

        Object.keys($$props).forEach(key => {
            if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Project> was created with unknown prop '${key}'`);
        });

        $$self.$$set = $$props => {
            if ("name" in $$props) $$invalidate(0, name = $$props.name);
            if ("href" in $$props) $$invalidate(1, href = $$props.href);
            if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
        };

        $$self.$capture_state = () => ({name, href});

        $$self.$inject_state = $$props => {
            if ("name" in $$props) $$invalidate(0, name = $$props.name);
            if ("href" in $$props) $$invalidate(1, href = $$props.href);
        };

        if ($$props && "$$inject" in $$props) {
            $$self.$inject_state($$props.$$inject);
        }

        return [name, href, $$scope, slots];
    }

    class Project extends SvelteComponentDev {
        constructor(options) {
            super(options);
            init(this, options, instance$1, create_fragment$1, safe_not_equal, {name: 0, href: 1});

            dispatch_dev("SvelteRegisterComponent", {
                component: this,
                tagName: "Project",
                options,
                id: create_fragment$1.name
            });

            const {ctx} = this.$$;
            const props = options.props || {};

            if (/*name*/ ctx[0] === undefined && !("name" in props)) {
                console.warn("<Project> was created without expected prop 'name'");
            }

            if (/*href*/ ctx[1] === undefined && !("href" in props)) {
                console.warn("<Project> was created without expected prop 'href'");
            }
        }

        get name() {
            throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        set name(value) {
            throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        get href() {
            throw new Error("<Project>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }

        set href(value) {
            throw new Error("<Project>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
        }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }

        return {set, update, subscribe};
    }

    const persistStore = (key, initial) => {
        const persist = (localStorage.getItem(key) === "true");
        const store = writable(persist !== null && persist !== void 0 ? persist : initial);
        store.subscribe(value => localStorage.setItem(key, String(value)));
        return store;
    };

    const defaultTheme = true; // dark mode
    const isDark = persistStore("isDark", defaultTheme);

    function fade(node, {delay = 0, duration = 400, easing = identity} = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src\App.svelte generated by Svelte v3.37.0 */
    const file = "src\\App.svelte";

    // (39:6) <Project href="https://github.com/theonlytails/rubymod" name="RubyMod">
    function create_default_slot_3(ctx) {
        let t0;
        let a0;
        let t2;
        let a1;
        let t4;

        const block = {
            c: function create() {
                t0 = text("A free and open source mod for ");
                a0 = element("a");
                a0.textContent = "Minecraft";
                t2 = text(" 1.16,\r\n\t\t\t\t\t\t\t\twritten in Kotlin using the ");
                a1 = element("a");
                a1.textContent = "Minecraft Forge\r\n\t\t\t\t\t\t\t\tAPI";
                t4 = text(".");
                attr_dev(a0, "href", "https://minecraft.net");
                add_location(a0, file, 39, 39, 1385);
                attr_dev(a1, "href", "https://github.com/MinecraftForge/MinecraftForge");
                add_location(a1, file, 40, 36, 1474);
            },
            m: function mount(target, anchor) {
                insert_dev(target, t0, anchor);
                insert_dev(target, a0, anchor);
                insert_dev(target, t2, anchor);
                insert_dev(target, a1, anchor);
                insert_dev(target, t4, anchor);
            },
            d: function destroy(detaching) {
                if (detaching) detach_dev(t0);
                if (detaching) detach_dev(a0);
                if (detaching) detach_dev(t2);
                if (detaching) detach_dev(a1);
                if (detaching) detach_dev(t4);
            }
        };

        dispatch_dev("SvelteRegisterBlock", {
            block,
            id: create_default_slot_3.name,
            type: "slot",
            source: "(39:6) <Project href=\\\"https://github.com/theonlytails/rubymod\\\" name=\\\"RubyMod\\\">",
            ctx
        });

        return block;
    }

    // (44:6) <Project href="https://github.com/theonlytails/loottables" name="LootTables">
    function create_default_slot_2(ctx) {
        let t;

        const block = {
            c: function create() {
                t = text("A Kotlin DSL for creating loot tables in Minecraft mods (using Forge).");
            },
            m: function mount(target, anchor) {
                insert_dev(target, t, anchor);
            },
            d: function destroy(detaching) {
                if (detaching) detach_dev(t);
            }
        };

        dispatch_dev("SvelteRegisterBlock", {
            block,
            id: create_default_slot_2.name,
            type: "slot",
            source: "(44:6) <Project href=\\\"https://github.com/theonlytails/loottables\\\" name=\\\"LootTables\\\">",
            ctx
        });

        return block;
    }

    // (47:6) <Project href="https://github.com/Team-Cryptic-Cosmos/Cryptic-Cosmos" name="Cryptic Cosmos">
    function create_default_slot_1(ctx) {
        let t0;
        let a;
        let t2;

        const block = {
            c: function create() {
                t0 = text("A Minecraft mod for 1.16 that introduces exciting new dimensions, mobs, and blocks, made by the\r\n\t\t\t\t\t\t\t\t");
                a = element("a");
                a.textContent = "Cryptic Cosmos Team";
                t2 = text(".");
                attr_dev(a, "href", "https://github.com/Team-Cryptic-Cosmos");
                add_location(a, file, 48, 8, 1982);
            },
            m: function mount(target, anchor) {
                insert_dev(target, t0, anchor);
                insert_dev(target, a, anchor);
                insert_dev(target, t2, anchor);
            },
            d: function destroy(detaching) {
                if (detaching) detach_dev(t0);
                if (detaching) detach_dev(a);
                if (detaching) detach_dev(t2);
            }
        };

        dispatch_dev("SvelteRegisterBlock", {
            block,
            id: create_default_slot_1.name,
            type: "slot",
            source: "(47:6) <Project href=\\\"https://github.com/Team-Cryptic-Cosmos/Cryptic-Cosmos\\\" name=\\\"Cryptic Cosmos\\\">",
            ctx
        });

        return block;
    }

    // (51:6) <Project href="https://github.com/theonlytails/theonlytails.com" name="This website">
    function create_default_slot(ctx) {
        let i;
        let t1;
        let a0;
        let t3;
        let a1;
        let t5;
        let a2;
        let t7;

        const block = {
            c: function create() {
                i = element("i");
                i.textContent = "You are looking at it";
                t1 = text(". Built with ");
                a0 = element("a");
                a0.textContent = "Svelte";
                t3 = text(", ");
                a1 = element("a");
                a1.textContent = "TypeScript";
                t5 = text(", and ");
                a2 = element("a");
                a2.textContent = "SCSS";
                t7 = text(".");
                add_location(i, file, 51, 8, 2176);
                attr_dev(a0, "href", "https://svelte.dev");
                add_location(a0, file, 51, 49, 2217);
                attr_dev(a1, "href", "https://www.typescriptlang.org/");
                add_location(a1, file, 51, 90, 2258);
                attr_dev(a2, "href", "https://sass-lang.com/");
                add_location(a2, file, 52, 69, 2331);
            },
            m: function mount(target, anchor) {
                insert_dev(target, i, anchor);
                insert_dev(target, t1, anchor);
                insert_dev(target, a0, anchor);
                insert_dev(target, t3, anchor);
                insert_dev(target, a1, anchor);
                insert_dev(target, t5, anchor);
                insert_dev(target, a2, anchor);
                insert_dev(target, t7, anchor);
            },
            d: function destroy(detaching) {
                if (detaching) detach_dev(i);
                if (detaching) detach_dev(t1);
                if (detaching) detach_dev(a0);
                if (detaching) detach_dev(t3);
                if (detaching) detach_dev(a1);
                if (detaching) detach_dev(t5);
                if (detaching) detach_dev(a2);
                if (detaching) detach_dev(t7);
            }
        };

        dispatch_dev("SvelteRegisterBlock", {
            block,
            id: create_default_slot.name,
            type: "slot",
            source: "(51:6) <Project href=\\\"https://github.com/theonlytails/theonlytails.com\\\" name=\\\"This website\\\">",
            ctx
        });

        return block;
    }

    function create_fragment(ctx) {
        let main;
        let h1;
        let img;
        let img_src_value;
        let t0;
        let h1_transition;
        let t1;
        let h4;
        let t2;
        let a0;
        let t4;
        let a1;
        let t6;
        let t7;
        let div0;
        let h3;
        let t9;
        let ul;
        let project0;
        let t10;
        let project1;
        let t11;
        let project2;
        let t12;
        let project3;
        let t13;
        let div1;
        let socialicon0;
        let t14;
        let socialicon1;
        let t15;
        let socialicon2;
        let t16;
        let p;
        let t17;
        let a2;
        let t19;
        let t20;
        let button;
        let t21_value = (/*$isDark*/ ctx[0] ? "🌚" : "🌝") + "";
        let t21;
        let current;
        let mounted;
        let dispose;

        project0 = new Project({
            props: {
                href: "https://github.com/theonlytails/rubymod",
                name: "RubyMod",
                $$slots: {default: [create_default_slot_3]},
                $$scope: {ctx}
            },
            $$inline: true
        });

        project1 = new Project({
            props: {
                href: "https://github.com/theonlytails/loottables",
                name: "LootTables",
                $$slots: {default: [create_default_slot_2]},
                $$scope: {ctx}
            },
            $$inline: true
        });

        project2 = new Project({
            props: {
                href: "https://github.com/Team-Cryptic-Cosmos/Cryptic-Cosmos",
                name: "Cryptic Cosmos",
                $$slots: {default: [create_default_slot_1]},
                $$scope: {ctx}
            },
            $$inline: true
        });

        project3 = new Project({
            props: {
                href: "https://github.com/theonlytails/theonlytails.com",
                name: "This website",
                $$slots: {default: [create_default_slot]},
                $$scope: {ctx}
            },
            $$inline: true
        });

        socialicon0 = new SocialIcon({
            props: {
                href: "https://github.com/theonlytails",
                style: /*githubIconStyle*/ ctx[3],
                title: "GitHub"
            },
            $$inline: true
        });

        socialicon1 = new SocialIcon({
            props: {
                href: "https://twitter.com/the_only_tails",
                size: 29,
                title: "Twitter"
            },
            $$inline: true
        });

        socialicon2 = new SocialIcon({
            props: {
                href: "https://reddit.com/u/theonlytails",
                title: "Reddit"
            },
            $$inline: true
        });

        const block = {
            c: function create() {
                main = element("main");
                h1 = element("h1");
                img = element("img");
                t0 = text("\r\n\t\t\t\tTheOnlyTails");
                t1 = space();
                h4 = element("h4");
                t2 = text("A curious ");
                a0 = element("a");
                a0.textContent = "Java";
                t4 = text(" and ");
                a1 = element("a");
                a1.textContent = "Kotlin";
                t6 = text(" programmer.");
                t7 = space();
                div0 = element("div");
                h3 = element("h3");
                h3.textContent = "Some of my projects!";
                t9 = space();
                ul = element("ul");
                create_component(project0.$$.fragment);
                t10 = space();
                create_component(project1.$$.fragment);
                t11 = space();
                create_component(project2.$$.fragment);
                t12 = space();
                create_component(project3.$$.fragment);
                t13 = space();
                div1 = element("div");
                create_component(socialicon0.$$.fragment);
                t14 = space();
                create_component(socialicon1.$$.fragment);
                t15 = space();
                create_component(socialicon2.$$.fragment);
                t16 = space();
                p = element("p");
                t17 = text("Reach me at ");
                a2 = element("a");
                a2.textContent = "Twitter";
                t19 = text(", or in Discord as TheOnlyTails#1886.");
                t20 = space();
                button = element("button");
                t21 = text(t21_value);
                attr_dev(img, "alt", "My icon!");
                attr_dev(img, "height", 35);
                attr_dev(img, "id", "logo");
                if (img.src !== (img_src_value = "icons/favicon.svg")) attr_dev(img, "src", img_src_value);
                attr_dev(img, "width", 35);
                add_location(img, file, 27, 4, 922);
                attr_dev(h1, "id", "title");
                add_location(h1, file, 25, 2, 827);
                attr_dev(a0, "href", "https://openjdk.java.net/");
                add_location(a0, file, 32, 14, 1052);
                attr_dev(a1, "href", "https://kotl.in");
                add_location(a1, file, 32, 63, 1101);
                add_location(h4, file, 31, 2, 1032);
                attr_dev(h3, "id", "projects-title");
                add_location(h3, file, 36, 4, 1189);
                attr_dev(ul, "class", "projects");
                add_location(ul, file, 37, 4, 1244);
                attr_dev(div0, "id", "projects");
                add_location(div0, file, 35, 2, 1164);
                attr_dev(div1, "class", "social");
                add_location(div1, file, 57, 2, 2418);
                attr_dev(a2, "href", "https://twitter.com/the_only_tails");
                add_location(a2, file, 64, 16, 2749);
                attr_dev(p, "id", "reach-out");
                add_location(p, file, 63, 2, 2713);
                attr_dev(button, "id", "theme-switch");
                attr_dev(button, "class", "svelte-1iqngr");
                add_location(button, file, 67, 2, 2856);
                attr_dev(main, "id", "page");
                set_style(main, "background-color", /*backgroundColor*/ ctx[1]);
                set_style(main, "color", /*textColor*/ ctx[2]);
                add_location(main, file, 24, 0, 743);
            },
            l: function claim(nodes) {
                throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
            },
            m: function mount(target, anchor) {
                insert_dev(target, main, anchor);
                append_dev(main, h1);
                append_dev(h1, img);
                append_dev(h1, t0);
                append_dev(main, t1);
                append_dev(main, h4);
                append_dev(h4, t2);
                append_dev(h4, a0);
                append_dev(h4, t4);
                append_dev(h4, a1);
                append_dev(h4, t6);
                append_dev(main, t7);
                append_dev(main, div0);
                append_dev(div0, h3);
                append_dev(div0, t9);
                append_dev(div0, ul);
                mount_component(project0, ul, null);
                append_dev(ul, t10);
                mount_component(project1, ul, null);
                append_dev(ul, t11);
                mount_component(project2, ul, null);
                append_dev(ul, t12);
                mount_component(project3, ul, null);
                append_dev(main, t13);
                append_dev(main, div1);
                mount_component(socialicon0, div1, null);
                append_dev(div1, t14);
                mount_component(socialicon1, div1, null);
                append_dev(div1, t15);
                mount_component(socialicon2, div1, null);
                append_dev(main, t16);
                append_dev(main, p);
                append_dev(p, t17);
                append_dev(p, a2);
                append_dev(p, t19);
                append_dev(main, t20);
                append_dev(main, button);
                append_dev(button, t21);
                current = true;

                if (!mounted) {
                    dispose = listen_dev(button, "click", /*switchTheme*/ ctx[4], false, false, false);
                    mounted = true;
                }
            },
            p: function update(ctx, [dirty]) {
                const project0_changes = {};

                if (dirty & /*$$scope*/ 32) {
                    project0_changes.$$scope = {dirty, ctx};
                }

                project0.$set(project0_changes);
                const project1_changes = {};

                if (dirty & /*$$scope*/ 32) {
                    project1_changes.$$scope = {dirty, ctx};
                }

                project1.$set(project1_changes);
                const project2_changes = {};

                if (dirty & /*$$scope*/ 32) {
                    project2_changes.$$scope = {dirty, ctx};
                }

                project2.$set(project2_changes);
                const project3_changes = {};

                if (dirty & /*$$scope*/ 32) {
                    project3_changes.$$scope = {dirty, ctx};
                }

                project3.$set(project3_changes);
                const socialicon0_changes = {};
                if (dirty & /*githubIconStyle*/ 8) socialicon0_changes.style = /*githubIconStyle*/ ctx[3];
                socialicon0.$set(socialicon0_changes);
                if ((!current || dirty & /*$isDark*/ 1) && t21_value !== (t21_value = (/*$isDark*/ ctx[0] ? "🌚" : "🌝") + "")) set_data_dev(t21, t21_value);

                if (!current || dirty & /*backgroundColor*/ 2) {
                    set_style(main, "background-color", /*backgroundColor*/ ctx[1]);
                }

                if (!current || dirty & /*textColor*/ 4) {
                    set_style(main, "color", /*textColor*/ ctx[2]);
                }
            },
            i: function intro(local) {
                if (current) return;

                add_render_callback(() => {
                    if (!h1_transition) h1_transition = create_bidirectional_transition(h1, fade, {duration: 300}, true);
                    h1_transition.run(1);
                });

                transition_in(project0.$$.fragment, local);
                transition_in(project1.$$.fragment, local);
                transition_in(project2.$$.fragment, local);
                transition_in(project3.$$.fragment, local);
                transition_in(socialicon0.$$.fragment, local);
                transition_in(socialicon1.$$.fragment, local);
                transition_in(socialicon2.$$.fragment, local);
                current = true;
            },
            o: function outro(local) {
                if (!h1_transition) h1_transition = create_bidirectional_transition(h1, fade, {duration: 300}, false);
                h1_transition.run(0);
                transition_out(project0.$$.fragment, local);
                transition_out(project1.$$.fragment, local);
                transition_out(project2.$$.fragment, local);
                transition_out(project3.$$.fragment, local);
                transition_out(socialicon0.$$.fragment, local);
                transition_out(socialicon1.$$.fragment, local);
                transition_out(socialicon2.$$.fragment, local);
                current = false;
            },
            d: function destroy(detaching) {
                if (detaching) detach_dev(main);
                if (detaching && h1_transition) h1_transition.end();
                destroy_component(project0);
                destroy_component(project1);
                destroy_component(project2);
                destroy_component(project3);
                destroy_component(socialicon0);
                destroy_component(socialicon1);
                destroy_component(socialicon2);
                mounted = false;
                dispose();
            }
        };

        dispatch_dev("SvelteRegisterBlock", {
            block,
            id: create_fragment.name,
            type: "component",
            source: "",
            ctx
        });

        return block;
    }

    const darkColor = "#444";
    const lightColor = "#EEE";

    function instance($$self, $$props, $$invalidate) {
        let backgroundColor;
        let textColor;
        let githubIconStyle;
        let $isDark;
        validate_store(isDark, "isDark");
        component_subscribe($$self, isDark, $$value => $$invalidate(0, $isDark = $$value));
        let {$$slots: slots = {}, $$scope} = $$props;
        validate_slots("App", slots, []);
        const switchTheme = () => isDark.update(value => !value);
        const writable_props = [];

        Object.keys($$props).forEach(key => {
            if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
        });

        $$self.$capture_state = () => ({
            SocialIcon,
            Project,
            isDark,
            fade,
            switchTheme,
            darkColor,
            lightColor,
            backgroundColor,
            $isDark,
            textColor,
            githubIconStyle
        });

        $$self.$inject_state = $$props => {
            if ("backgroundColor" in $$props) $$invalidate(1, backgroundColor = $$props.backgroundColor);
            if ("textColor" in $$props) $$invalidate(2, textColor = $$props.textColor);
            if ("githubIconStyle" in $$props) $$invalidate(3, githubIconStyle = $$props.githubIconStyle);
        };

        if ($$props && "$$inject" in $$props) {
            $$self.$inject_state($$props.$$inject);
        }

        $$self.$$.update = () => {
            if ($$self.$$.dirty & /*$isDark*/ 1) {
                $$invalidate(1, backgroundColor = $isDark ? darkColor : lightColor);
            }

            if ($$self.$$.dirty & /*$isDark*/ 1) {
                $$invalidate(2, textColor = $isDark ? lightColor : darkColor);
            }

            if ($$self.$$.dirty & /*$isDark*/ 1) {
                $$invalidate(3, githubIconStyle = `filter: invert(${$isDark ? "100%" : "0%"})`);
            }
        };

        return [$isDark, backgroundColor, textColor, githubIconStyle, switchTheme];
    }

    class App extends SvelteComponentDev {
        constructor(options) {
            super(options);
            init(this, options, instance, create_fragment, safe_not_equal, {});

            dispatch_dev("SvelteRegisterComponent", {
                component: this,
                tagName: "App",
                options,
                id: create_fragment.name
            });
        }
    }

    const app = new App({
        target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map

/** @typedef {typeof __propDef.props}  MarqueeProps */
/** @typedef {typeof __propDef.events}  MarqueeEvents */
/** @typedef {typeof __propDef.slots}  MarqueeSlots */
export default class Marquee extends SvelteComponentTyped<{
    duration?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type MarqueeProps = typeof __propDef.props;
export type MarqueeEvents = typeof __propDef.events;
export type MarqueeSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        duration?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};

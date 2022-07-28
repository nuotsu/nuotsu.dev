/** @typedef {typeof __propDef.props}  PipewriterProps */
/** @typedef {typeof __propDef.events}  PipewriterEvents */
/** @typedef {typeof __propDef.slots}  PipewriterSlots */
export default class Pipewriter extends SvelteComponentTyped<{
    text: any;
    duration?: number;
    typeSpeed?: number;
    backspaceSpeed?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PipewriterProps = typeof __propDef.props;
export type PipewriterEvents = typeof __propDef.events;
export type PipewriterSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        text: any;
        duration?: number;
        typeSpeed?: number;
        backspaceSpeed?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};

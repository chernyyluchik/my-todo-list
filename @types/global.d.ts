// Global definitions (you shouldn't import it, it is global scope)
/* eslint-disable */

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
    const value: SvgrComponent;
    export default value;
}
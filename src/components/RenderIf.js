const RenderIf = ({condition, children = () => null}) => condition ? children() : null
export default RenderIf;

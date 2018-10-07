const RenderIf = ({condition, children = () => null, fallback = () => null}) => condition ? children() : fallback()
export default RenderIf;

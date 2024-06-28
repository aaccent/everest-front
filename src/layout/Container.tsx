import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {
    className?: string
}
export default function Container({children, className}: Props ) {
    return <div className={`px-[56px] ${className}`}>
        {children}
    </div>
}
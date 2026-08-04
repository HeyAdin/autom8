export function Logo({classname}:{classname:string}) {
    return (
        <div className = {classname}>
            <LogoIcon />
        </div>
    )
}

export function LogoIcon() {
    return <svg
        width="18"
        height="17"
        viewBox="0 0 15 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g transform="rotate(-90) translate(-20 0)">
            <path d="M4.92285 14.8848H0V9.96191H4.92285V14.8848ZM19.6924 14.8848H9.84668V9.96191H4.92383V5.03809H9.84668V0.115234H19.6924V14.8848ZM9.84668 9.96191H14.7695V5.03906H9.84668V9.96191ZM4.92285 5.03809H0V0.115234H4.92285V5.03809Z" 
            fill="#ff4f00" />
        </g>
    </svg>

}
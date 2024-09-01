import { useState } from "react";

interface Props {
    children: React.ReactNode;
}

function Box({ children }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

export default Box;

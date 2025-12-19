import React from "react";

export default function ProgressBar({ value }: { value: number }) {
    return (
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
                className="h-full bg-[#FFB703] rounded-full transition-all"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
}

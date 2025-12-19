export default function ActivityStats() {
    const stats = [
        { label: "Total XP", value: 110, color: "#003F88" },
        { label: "Minutes Learned", value: 80, color: "#219EBC" },
        { label: "Lessons Completed", value: 12, color: "#FFB703" },
        { label: "Words Learned", value: 45, color: "#FB8500" },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-[#003F88] mb-6">Learning Activity</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="flex flex-col items-center"
                    >
            <span
                className="text-3xl font-extrabold"
                style={{ color: s.color }}
            >
              {s.value}
            </span>
                        <p className="text-sm text-[#0F172A]/70 mt-1">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

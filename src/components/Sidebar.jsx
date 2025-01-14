/* eslint-disable react/prop-types */
const Sidebar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { name: "Dashboard", key: "dashboard" },
        { name: "Farmers", key: "users" },
        { name: "Fields", key: "fields" },
        { name: "Transactions", key: "transactions" },
    ];

    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4 text-green-600 font-bold text-2xl">Agrifuture</div>
            <ul className="space-y-4 p-4">
                {tabs.map((tab) => (
                    <li
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`cursor-pointer px-4 py-2 rounded-md ${activeTab === tab.key
                            ? "bg-green-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {tab.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

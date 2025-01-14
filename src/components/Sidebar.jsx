/* eslint-disable react/prop-types */
const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, toggleSidebar }) => {
    const tabs = [
        { name: "Dashboard", key: "dashboard" },
        { name: "Farmers", key: "users" },
        { name: "Fields", key: "fields" },
        { name: "Transactions", key: "transactions" },
    ];

    return (
        <div
            className={`fixed top-0 left-0 h-full z-40 bg-white shadow-md w-64 transform transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="p-4 text-green-600 font-bold text-2xl flex justify-between items-center">
                <span>Sensegrass</span>
                {/* Close button for mobile */}
                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 hover:bg-gray-100 p-2 rounded-md md:hidden"
                >
                    ✖
                </button>
            </div>
            <ul className="space-y-4 p-4">
                {tabs.map((tab) => (
                    <li
                        key={tab.key}
                        onClick={() => {
                            setActiveTab(tab.key);
                            toggleSidebar();
                        }}
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

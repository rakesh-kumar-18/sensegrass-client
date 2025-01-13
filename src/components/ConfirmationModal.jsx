import { useField } from "../context/FieldContext";

const ConfirmationModal = () => {
    const {
        isConfirmationModalOpen,
        setConfirmationModalOpen,
        selectedField,
        deleteField,
        loading,
    } = useField();

    const handleConfirm = async () => {
        await deleteField(selectedField._id);
        setConfirmationModalOpen(false);
    };

    if (!isConfirmationModalOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p className="text-gray-700 mb-6">
                    Are you sure you want to delete the field{" "}
                    <span className="font-semibold">{selectedField?.fieldName}</span>?
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => setConfirmationModalOpen(false)}
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;

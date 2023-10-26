import { useState, ChangeEvent, KeyboardEvent } from "react";

interface AddProductModalProps {
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export const AddProductModal = ({
  onClose,
  onSubmit,
}: AddProductModalProps) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onAdd = () => {
    if (inputValue !== "") {
      onSubmit(inputValue);
      onClose();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 right-0 h-screen flex justify-center items-center bg-gray-350"
    >
      <form
        className="flex flex-col w-80 h-40 bg-white justify-around p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>New product</h3>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={inputValue}
            onChange={onInputChange}
            className="border-solid border-2 border-indigo-300 p-2 m-1"
            onKeyDown={onKeyDown}
            required
          />
        </div>

        <div className="flex justify-around">
          <button
            onClick={onAdd}
            className="bg-green-100 px-2 py-1 focus:outline-none"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-red-100 px-2 py-1 hover:bg-red-200 focus:outline-none"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

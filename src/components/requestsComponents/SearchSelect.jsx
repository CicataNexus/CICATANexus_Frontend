import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";

const SearchSelect = ({
  options,
  placeholder,
  selectedItems,
  onSelectedItemsChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter the options based on the search term
  const filterOptions = (term) => {
    setSearchTerm(term);
    setFilteredOptions(
      options.filter((option) =>
        option.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSelect = (option) => {
    if (!selectedItems.some((item) => item.name === option.name)) {
      const newSelectedItems = [...selectedItems, option];
      onSelectedItemsChange(newSelectedItems);
    }
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleRemove = (itemToRemove) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item.name !== itemToRemove.name
    );
    onSelectedItemsChange(newSelectedItems);
  };

  const handleIconDropdownClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setFilteredOptions(options);
    setSearchTerm("");
  }, [options]);

  useEffect(() => {
    document.addEventListener("mousedown", handleIconDropdownClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleIconDropdownClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Icon
        icon="material-symbols:search-rounded"
        className="absolute left-3 top-2.5 text-black text-xl pointer-events-none"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => filterOptions(e.target.value)}
        onClick={() => setIsOpen(!isOpen)}
        placeholder={placeholder || "Seleccione una opción"}
        className="w-full border-2 border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent focus:bg-input-background p-2 pl-10 rounded-lg font-montserrat text-sm"
      />
      {isOpen && (
        <div className="overflow-scroll mt-2 w-full max-h-56 grid grid-cols-2 gap-2">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-gray-500 font-montserrat">
              No se encontró
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              // For para ir enseñando el endpoint de la imagen
              return (
                <div
                  key={index}
                  className="border-2 border-primary-blue flex flex-col items-center rounded-lg bg-white"
                >
                  {option.photoId && (
                    <>
                      <img
                        src={`http://${import.meta.env.VITE_SERVER_IP}:${
                          import.meta.env.VITE_SERVER_PORT
                        }/v1/photo/${option.photoId}`}
                        alt={`Imagen de ${option.name}`}
                        className="p-2 w-full max-h-35 object-contain"
                      />
                      <div className="w-full border-t border-primary-blue"></div>
                    </>
                  )}

                  <div className="p-2 w-full flex flex-col justify-between h-full">
                    <p className="text-base font-montserrat font-semibold">
                      {option.name}
                    </p>
                    <p className="text-sm font-montserrat mt-2">
                      <span className="font-medium">Marca:</span>
                      <br />
                      <span className="font-normal">{option.brand}</span>
                    </p>
                    <p className="text-sm font-montserrat mt-2">
                      <span className="font-medium">Ubicación:</span>
                      <br />
                      <span className="font-normal">{option.location}</span>
                    </p>
                    <div className="mt-auto pt-3 flex justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-md font-poppins font-semibold text-sm bg-deep-blue hover:bg-dark-blue text-white transition inline-flex items-center"
                        onClick={() => handleSelect(option)}
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
      <div className="flex gap-2">
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="flex border-2 border-primary-blue p-2 mt-2 rounded-xl items-center space-x-2"
          >
            <span className="font-montserrat font-semibold text-sm">
              {item.name}
            </span>
            <button
              onClick={() => handleRemove(item)}
              className="cursor-pointer"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSelect;

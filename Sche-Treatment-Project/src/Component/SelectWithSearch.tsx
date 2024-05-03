import React, { useState, useEffect, useRef } from "react";
import { Form, Col } from "react-bootstrap";
import "../assets/css/SelectWithSearch.css";
import { Account, Doctor, Service } from "../Models/Model";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  label: string;
  value: string;
  placeholder: string;
  style: number;
  onSelectChange: (value: string) => void;
}

export const SelectWithSearch: React.FC<Props> = ({
  options,
  label,
  placeholder,
  style,
  onSelectChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (word: string, value: string) => {
    setSelectedValue(word);
    onSelectChange(value);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedValue("");
    onSelectChange(""); // Set value to empty when input is edited
    // setShowDropdown(true);
  };

  const filteredOptions = inputValue
    ? options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : options;

  return (
    <Col xs={style}>
      <Form.Group controlId={`form${label}`}>
        {label ? <Form.Label>{label}</Form.Label> : ""}
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <input
            type="text"
            value={selectedValue || inputValue}
            className="custom-select-input"
            placeholder={`${placeholder}...`}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
          />
          {showDropdown && (
            <div className="custom-select-dropdown">
              <ul>
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() =>
                      handleSelectChange(option.label, option.value)
                    }
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Form.Group>
    </Col>
  );
};
interface ChooseServicesProps {
  dataSelected: Service[];
  data: Service[];
}

export const ChooseServices: React.FC<ChooseServicesProps> = ({
  data,
  dataSelected,
}) => {
  const [showDropdown, setShowDropdown] = useState(false); // show dropdown
  const [selectedValues, setSelectedValues] = useState<Service[]>(dataSelected); // selected list Service
  const [inputValue, setInputValue] = useState(""); // user input value
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (selectedOption: Service) => {
    setSelectedValues([...selectedValues, selectedOption]);
    setShowDropdown(false);
  };
  const handleRemoveSelectedValue = (selectedOption: Service) => {
    const updatedSelectedValues = selectedValues.filter(
      (option) => option.id !== selectedOption.id
    );
    setSelectedValues(updatedSelectedValues);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const filter = inputValue
    ? data.filter((service) =>
        service.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : data;

  return (
    <Col xs={4}>
      <Form.Group controlId="form">
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <input
            type="text"
            value={inputValue}
            className="custom-select-input"
            placeholder={`Chọn...`}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
          />
          {showDropdown && (
            <div className="custom-select-dropdown">
              <ul>
                {filter.map((service) => (
                  <li
                    key={service.id}
                    onClick={() => handleSelectChange(service)}
                  >
                    {service.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          {selectedValues.map((selectedValue) => (
            <span key={selectedValue.id} className="selected-value">
              {selectedValue.name}{" "}
              <button
                onClick={() => handleRemoveSelectedValue(selectedValue)}
                className="remove-button"
              >
                X
              </button>
            </span>
          ))}
        </div>
      </Form.Group>
    </Col>
  );
};
interface ChooseDoctorProps {
  dataSelected: Doctor | null;
  data: Doctor[] | null;
  onDoctorSelect: (doctor: Doctor) => void;
}
export const ChooseDoctor: React.FC<ChooseDoctorProps> = ({
  data,
  dataSelected,
  onDoctorSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Doctor | null>(
    dataSelected
  );
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (selectedOption: Doctor) => {
    setSelectedValues(selectedOption);
    onDoctorSelect(selectedOption);
    setShowDropdown(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const filter = inputValue
    ? data?.filter((doctor) =>
        doctor.accountName.toLowerCase().includes(inputValue.toLowerCase())
      )
    : data;

  return (
    <Col >
      <Form.Group controlId="form">
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <input
            type="text"
            value={selectedValues?.accountName || ""}
            className="custom-select-input"
            placeholder={`Chọn...`}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
          />
          {showDropdown && (
            <div className="custom-select-dropdown">
              <ul>
                {filter?.map((doctor) => (
                  <li
                    key={doctor.id}
                    onClick={() => handleSelectChange(doctor)}
                  >
                    {doctor.accountName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Form.Group>
    </Col>
  );
};

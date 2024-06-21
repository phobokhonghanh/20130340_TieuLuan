import React, { useState, useEffect, useRef } from "react";
import { Form, Col } from "react-bootstrap";
import "../assets/css/SelectWithSearch.css";
import {
  Account,
  ServiceDTO,
  ServiceEntity,
} from "../Models/Model";
import { formatPrice } from "../Utils/Utils";


interface ChooseServicesProps {
  dataSelected: ServiceDTO[];
  data: ServiceDTO[];
  callbackDataSelected: (list: ServiceDTO[]) => void;
}

export const ChooseServices: React.FC<ChooseServicesProps> = ({
  data,
  dataSelected,
  callbackDataSelected,
}) => {
  const [showDropdown, setShowDropdown] = useState(false); // hiển thị dropdown
  const [selectedValues, setSelectedValues] =
    useState<ServiceDTO[]>(dataSelected); // danh sách dịch vụ chọn
  const [inputValue, setInputValue] = useState(""); // keyword người dùng nhập
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

  const handleSelectChange = (selectedOption: ServiceDTO) => {
    setSelectedValues([...selectedValues, selectedOption]);
    callbackDataSelected([...selectedValues, selectedOption]);
    setShowDropdown(false);
  };
  const handleRemoveSelectedValue = (selectedOption: ServiceDTO) => {
    const updatedSelectedValues: ServiceDTO[] = selectedValues.filter(
      (option) => option.id !== selectedOption.id
    );
    setSelectedValues(updatedSelectedValues);
    callbackDataSelected(updatedSelectedValues);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const filter = inputValue
    ? data.filter((service) =>
        service.serviceName.toLowerCase().includes(inputValue.toLowerCase())
      )
    : data;

  return (
    <Col>
      <Form.Group controlId="form">
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <input
            type="text"
            value={inputValue}
            className="custom-select-input"
            placeholder={`Chọn dịch vụ...`}
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
                    {service.serviceName} (
                    {service.clinic
                      ? service.clinic
                      : ""}{" "}
                    - {formatPrice(service.servicePrice)})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="container-selected-value">
          {selectedValues.map((selectedValue) => (
            <div key={selectedValue.id} className="selected-value">
              {selectedValue.serviceName}{" "}
              <button
                onClick={() => handleRemoveSelectedValue(selectedValue)}
                className="remove-button"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </Form.Group>
    </Col>
  );
};
interface ChooseDoctorProps {
  dataSelected: Account | null;
  data: Account[] | null;
  onDoctorSelect: (doctor: Account) => void;
}
export const ChooseDoctor: React.FC<ChooseDoctorProps> = ({
  data,
  dataSelected,
  onDoctorSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Account | null>(
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

  const handleSelectChange = (selectedOption: Account) => {
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
    <Col>
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

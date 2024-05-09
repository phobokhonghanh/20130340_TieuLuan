import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { CalendarModel, Clinic } from "../Models/Model";

interface DepartmentProps {
  clinicSelect: Clinic;
  dataListClinic: Clinic[];
  onClinicSelected: (selectedClinic: Clinic) => void;
  onDoctorSelected: (selectedDoctor: CalendarModel) => void;
}
const Department: React.FC<DepartmentProps> = ({
  clinicSelect,
  dataListClinic,
  onClinicSelected,
  onDoctorSelected,
}) => {
  const [clinic, setClinic] = useState<Clinic>(clinicSelect);

  const handleClinicSelected = (selectedClinic: Clinic) => {
    onClinicSelected(selectedClinic);
    setClinic(selectedClinic);
  };
  const handleDoctorSelected = (selectedDoctor: CalendarModel) => {
    onDoctorSelected(selectedDoctor);
  };
  return (
    <Row>
      <ClinicSelected
        data={dataListClinic}
        onClinicSelected={handleClinicSelected}
        clinicSelect={clinic}
      />
      <DoctorSelected
        data={clinic ? clinic.calendars : []}
        onCalendarSelected={handleDoctorSelected}
      />
    </Row>
  );
};
export default Department;

interface ClinicSelectedProps {
  clinicSelect: Clinic | undefined;
  data: Clinic[];
  onClinicSelected: (selectedClinic: Clinic) => void;
}

export function ClinicSelected({
  clinicSelect,
  data,
  onClinicSelected,
}: ClinicSelectedProps) {
  const [selected, setSelected] = useState<Clinic | undefined>(clinicSelect);
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleSelectChange = (value: Clinic) => {
    setSelected(value);
    onClinicSelected(value);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelected(undefined);
  };

  const filteredOptions = inputValue
    ? data.filter((option) =>
        option.clinicName.toLowerCase().includes(inputValue.toLowerCase())
      )
    : data;
  return (
    <Col xs={0}>
      <Form.Group controlId={`formPackage`}>
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <input
            type="text"
            value={selected?.clinicName || inputValue}
            className="custom-select-input"
            placeholder={`Tìm kiếm khoa khám...`}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
            required
          />
          {showDropdown && (
            <div className="custom-select-dropdown">
              <ul>
                {filteredOptions.map((option) => (
                  <li
                    key={option.id}
                    onClick={() => handleSelectChange(option)}
                  >
                    {option.clinicName}{" "}
                    {option.medicalAreaId
                      ? "(" + option.medicalAreaId.areaName + ")"
                      : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Form.Group>
    </Col>
  );
}
interface DoctorSelectedProps {
  data: CalendarModel[];
  onCalendarSelected: (selectedCalendar: CalendarModel) => void;
}
export function DoctorSelected({
  data,
  onCalendarSelected,
}: DoctorSelectedProps) {
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleSelectChange = (value: CalendarModel) => {
    setSelected(
      value.doctor.doctorDegree +
        " " +
        value.doctor.doctorRank +
        " " +
        value.doctor.accountName
    );
    onCalendarSelected(value);
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelected("");
  };

  const filteredOptions = inputValue
    ? data.filter((option) =>
        option.doctor.accountName
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
    : data;
  return (
    <Col xs={0}>
      <Form.Group controlId={`formPackage`}>
        {<Form.Label>Bác sĩ</Form.Label>}
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <input
            type="text"
            value={selected || inputValue}
            className="custom-select-input"
            placeholder={`Tìm kiếm bác sĩ...`}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
          />
          {showDropdown && (
            <div className="custom-select-dropdown">
              <ul>
                {filteredOptions.map((option) => (
                  <li
                    key={option.id}
                    onClick={() => handleSelectChange(option)}
                  >
                    {option.doctor.doctorDegree +
                      " " +
                      option.doctor.doctorRank +
                      " " +
                      option.doctor.accountName +
                      " (" +
                      option.groupTime.groupTimeDescription +
                      "/" +
                      option.calendarDate +
                      ")"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Form.Group>
    </Col>
  );
}

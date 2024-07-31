import React, { useState, useEffect, useRef } from "react";
import { Form, Col } from "react-bootstrap";
import "../assets/css/SelectWithSearch.css";
import { ServiceDTO } from "../Models/Model";
import { formatPrice } from "../Utils/Utils";
import { DoctorResponse } from "../Models/Doctors/DoctorResponse";
import DoctorItem from "./Doctors";
import { CalendarResponse } from "../Models/Calendars/CalendarResponse";
import { deleteCalendar } from "../apiConfig";
import { useModalContext } from "../hooks/ModalProvider";

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
                    {service.clinic ? service.clinic : ""} -{" "}
                    {formatPrice(service.servicePrice)})
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
  dataSelected: CalendarResponse[];
  data: DoctorResponse[];
  onDoctorSelect: (doctor: DoctorResponse) => void;
}
export const ChooseDoctor: React.FC<ChooseDoctorProps> = ({
  dataSelected,
  data,
  onDoctorSelect,
}) => {
  const { refreshFirstModal } = useModalContext();
  const handleRefresh = () => {
    refreshFirstModal();
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedValues, setSelectedValues] =
    useState<CalendarResponse[]>(dataSelected);

  useEffect(() => {
    setSelectedValues(dataSelected);
  }, [dataSelected]);

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

  const handleSelectChange = (doctor: DoctorResponse) => {
    if (
      selectedValues.find(
        (selectedDoctor) => selectedDoctor.doctor.id === doctor.id
      )
    ) {
      alert("Bác sĩ đã được chọn, vui lòng chọn bác sĩ khác");
    } else {
      if (selectedValues.length - dataSelected.length >= 1) {
        alert("Mỗi lần chỉ được thêm 1 bác sĩ");
        return;
      }
      const groupTime = { id: "1", groupTimeDescription: "", supports: [] };
      const calendarResponse: CalendarResponse = new CalendarResponse(
        "",
        new Date().toDateString(),
        doctor,
        groupTime
      );
      setSelectedValues([...selectedValues, calendarResponse]);
      onDoctorSelect(doctor);
      setShowDropdown(false);
    }
  };

  const handleRemoveSelectedValue = (selectedOption: CalendarResponse) => {
    const updatedSelectedValues: CalendarResponse[] = selectedValues.filter(
      (option) => option.id !== selectedOption.id
    );
    const removedValues = selectedValues.filter(
      (option) => option.id === selectedOption.id
    );
    const callApi = (id: string) => {
      deleteCalendar(id)
        .then((response) => {
          if (response.status === 200) {
            alert("Xóa bác sĩ khỏi ca trực");
            setSelectedValues(updatedSelectedValues);
            handleRefresh(); // Refresh the modal to update the selected doctors list
          }
        })
        .catch((error: any) => {
          // Xử lý lỗi khi request không thành công
          console.error("Error:", error);
          alert("Không thể xóa, đã có người đặt lịch hẹn với bác sĩ");
        });
    };
    removedValues.forEach((option) => {
      if (option.id === "") {
        // Update selected values directly if ID is empty
        setSelectedValues(updatedSelectedValues);
      } else {
        // Call API if ID is not empty
        callApi(option.id); // Assuming option.id is the ID to be passed to the API
      }
    });
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
    <>
      <Col>
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
                  {filter?.map((doctor) => (
                    <li
                      key={doctor.id}
                      onClick={() => handleSelectChange(doctor)}
                    >
                      <DoctorItem doctor={doctor} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="container-selected-value">
            {selectedValues.map((doctor) => (
              <div
                key={doctor.id}
                className="selected-value"
                style={{ width: "97%" }}
              >
                <DoctorItem doctor={doctor.doctor} />
                <button
                  type="button"
                  onClick={() => handleRemoveSelectedValue(doctor)}
                  className="remove-button"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </Form.Group>
      </Col>
    </>
  );
};

import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Option, SelectWithSearch } from "./SelectWithSearch";
export const DepartmentCategory = () => {
  const [dataDepartments] = useState<Option[]>([
    { value: "dermatology", label: "Da liễu" },
    { value: "internal", label: "Nội khoa" },
    { value: "surgery", label: "Ngoại khoa" },
  ]);
  return <></>;
};
const Department: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [dataDepartments] = useState<Option[]>([
    { value: "dermatology", label: "Da liễu" },
    { value: "internal", label: "Nội khoa" },
    { value: "surgery", label: "Ngoại khoa" },
  ]);
  const [dataDotors] = useState<Option[]>([
    { value: "A", label: "Bác sĩ A" },
    { value: "B", label: "Bác sĩ B" },
    { value: "C", label: "Bác sĩ C" },
  ]);
  return (
    <Row>
      <SelectWithSearch
        label="Khoa khám"
        options={dataDepartments}
        value={selectedDepartment}
        onSelectChange={setSelectedDepartment}
        style={6}
        placeholder={"Tìm kiếm khoa khám"}
      />
      <SelectWithSearch
        label="Bác sĩ"
        options={dataDotors}
        value={selectedDoctor}
        onSelectChange={setSelectedDoctor}
        style={6}
        placeholder={"Tìm kiếm bác sĩ"}
      />
    </Row>
  );
};

export default Department;

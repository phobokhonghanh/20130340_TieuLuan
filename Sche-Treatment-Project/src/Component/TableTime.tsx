import { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

const TableTime = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const generateTimeSlots = () => {
    const currentWeekDay = currentWeek.getDay();
    const daysOfWeek = [
      "THỨ HAI",
      "THỨ BA",
      "THỨ TƯ",
      "THỨ NĂM",
      "THỨ SÁU",
      "THỨ BẢY",
      "CHỦ NHẬT",
    ];
    const startDate = new Date(currentWeek);
    startDate.setDate(
      currentWeek.getDate() - currentWeekDay + (currentWeekDay === 0 ? -6 : 1)
    );

    const timeSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      let style = "";
      currentDate.setDate(currentDate.getDate() + i);
      const dateString = currentDate.toLocaleDateString("vi-VN", {
        weekday: "long",
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });
      const [_, date] = dateString.split(",");

      const timeRanges = Array.from({ length: 10 }, (_, i) => `${i + 7}:00`);

      const timeSlotsForDay = timeRanges.map((time, index) => {
        const timeStart = new Date(currentDate);
        timeStart.setHours(index + 7);
        if (timeStart < new Date()) {
          style = "past-time";
          return <span key={index}>{time}</span>;
        } else {
          style = "time";
          return <span key={index}>{time}</span>;
        }
      });

      timeSlots.push({
        day: daysOfWeek[i],
        date: date.trim(),
        timeRanges: timeSlotsForDay,
        styles: style,
      });
    }

    return timeSlots;
  };

  const renderTimeTable = () => {
    const timeSlots = generateTimeSlots();

    return (
      <table className="table">
        <thead>
          <tr className="text-ali-center">
            {timeSlots.map((slot) => (
              <th key={slot.date} className="">
                {slot.day}
                <br />
                {slot.date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots[0].timeRanges.map((_time, index) => (
            <tr className="text-ali-center" key={index}>
              {timeSlots.map((slot) => (
                <td className={slot.styles} key={`${slot.date}-${index}`}>
                  {slot.timeRanges[index]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentWeek);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentWeek(previousWeek);
  };

  return (
    <Container>
      <Form.Label>Chọn ngày khám:</Form.Label>
      <Row className="justify-content-center">
        <Col className="displayflex">
          <button className="button" onClick={goToPreviousWeek}>
            &lt;
          </button>
          <div className="table-responsive width">{renderTimeTable()}</div>
          <button className="button" onClick={goToNextWeek}>
            &gt;
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default TableTime;

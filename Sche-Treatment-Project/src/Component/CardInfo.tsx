import { Link } from "react-router-dom";
import "../assets/css/CardInfo.css";

interface CardProps {
  backgroundImage: string;
  subtitle: string;
  title: string;
  content: React.ReactNode;
  href: string;
  style: string;
}

const Card: React.FC<CardProps> = ({
  backgroundImage,
  subtitle,
  title,
  content,
  href,
  style,
}) => (
  <div
    className={`col-lg-4 ${style != "last" ? "col-md-6" : "col-md-12"} col-12 `}
  >
    <div className={`single-schedule ${style}`}>
      <div className="inner">
        <div className="icon">
          <i className={backgroundImage}></i>
        </div>
        <div className="single-content">
          <span>{subtitle}</span>
          <h4>{title}</h4>
          {content instanceof Node ? content.textContent : content}
          <Link to={href}>
            CHI TIẾT<i className="fa fa-long-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
function CardInfo() {
  return (
    <>
      <section className="schedule">
        <div className="container">
          <div className="schedule-inner">
            <div className="row">
              <Card
                backgroundImage="fa fa-ambulance"
                subtitle="Khẩn cấp, Trực 24/7"
                title="Cấp cứu: 19008080"
                content={
                  <p>
                    Thời gian vàng là thời gian cứu sống bệnh nhân. Hãy tin
                    tưởng và gọi ngay cho chúng tôi!
                  </p>
                }
                href="/about-us"
                style="first"
              />
              <Card
                backgroundImage="fa fa-user-md"
                subtitle="Những người có chuyên môn cao"
                title="Bác sĩ"
                content={
                  <p>
                    Chúng tôi sẽ nổ lực hết sức vì niềm vui của bạn là nhiệm vụ
                    của chúng tôi!
                  </p>
                }
                href="/doctors"
                style="middle"
              />
              <Card
                backgroundImage="fa fa-calendar"
                subtitle="Lịch trình"
                title="Thời gian khám bệnh"
                content={
                  <ul className="time-sidual">
                    <li className="day">
                      Thứ 2 - Thứ 7<span>7.00-16.00</span>
                    </li>
                    <li className="day">
                      Chủ Nhật <span>7.00-11.30</span>
                    </li>
                  </ul>
                }
                href="/services"
                style="last"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default CardInfo;

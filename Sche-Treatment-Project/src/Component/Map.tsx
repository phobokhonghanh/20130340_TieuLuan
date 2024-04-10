function GoogleMap() {
  return (
    <div className="">
      <div className="col-lg-12 my-4" style={{textAlign: "center"}}>
          <h4>
            Địa chỉ: 64 Lê Văn Chí, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí
            Minh, Vietnam
          </h4>
      </div>
      <div className="col-lg-12 my-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.623062901213!2d106.7607601153482!3d10.862009492257706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752cf41f758e7d%3A0xb0b6f1cbcb3649e3!2s64%20L%C3%AA%20V%C4%83n%20Ch%C3%AD%2C%20Khu%20Ph%E1%BB%91%201%2C%20Ph%C6%B0%E1%BB%9Dng%20Linh%20Trung%2C%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c%2C%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2sus!4v1648055463076!5m2!1sen!2sus"
          className="w-100"
          height="800"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default GoogleMap;

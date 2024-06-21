function GoogleMap() {
  return (
    <div className="">
      <div className="col-lg-12 my-4" style={{ textAlign: "center" }}>
        <h4>Địa chỉ: Khu Phố 6, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam</h4>
      </div>
      <div className="col-lg-12 my-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.247427927171!2d106.78580347597763!3d10.868776139285682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1718123434855!5m2!1svi!2s"
          className="w-100"
          height="800"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default GoogleMap;

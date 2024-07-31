# Sử dụng image của OpenJDK có kích thước nhỏ hơn
FROM openjdk:22-jdk-slim

# Cài đặt các gói cần thiết cho MySQL và các gói phụ thuộc cho project Spring
RUN apt-get update \
    && apt-get install -y --no-install-recommends netcat-openbsd locales \
    && apt-get clean \
    && locale-gen C.UTF-8

# Đặt thư mục làm việc mặc định
WORKDIR /essay_server

# Sao chép các tệp lưu trữ của project Spring vào trong Dockerfile
COPY target/Sche_Treatment_Project_API-0.0.1-SNAPSHOT.jar /essay_server

# Copy the cred.json file into the container
COPY cred.json /essay_server/cred.json

# Mở cổng cho MySQL và Spring
EXPOSE 8080

# Đặt định dạng mã hóa Unicode
ENV LANG = C.UTF-8
ENV LC_ALL C.UTF-8

# Chạy ứng dụng Spring
CMD ["java", "-jar", "Sche_Treatment_Project_API-0.0.1-SNAPSHOT.jar"]

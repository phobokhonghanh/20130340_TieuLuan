package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import st.hcmuaf.edu.vn.sche_treatment_project_api.Utils.MessageUtils;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Appointment;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Bill;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.AppointmentDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.DTO.BillDTO;
import st.hcmuaf.edu.vn.sche_treatment_project_api.response.StatisticalResponse;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.AppointmentService;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.BillService;

import java.util.List;

@RestController
@RequestMapping("${api}")
public class BillController {
    @Autowired
    private BillService billService;

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Object> handleDataAccessException() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/admin/bill/sum/months")
    public ResponseEntity<List<Double>> getSumBillMonths(@RequestParam(name = "is_pay", defaultValue = "true") boolean is_pay) {
        return ResponseEntity.ok(billService.sumBillMonths(is_pay));
    }
    @GetMapping("/admin/bill/all")
    public ResponseEntity<Page<BillDTO>> getAll(@RequestParam(name = "page", defaultValue = "1") Integer pageNo, @RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return ResponseEntity.ok(billService.getAll(pageNo,keyword));
    }

    @GetMapping("/admin/bill/sum/week")
    public ResponseEntity<Double> getSumBillWeek() {
        return ResponseEntity.ok(billService.sumBillWeek());
    }
    @PatchMapping("/doctor-side/payment/cash/{id}")
    public ResponseEntity updatePaid(@PathVariable String id, @RequestParam(name = "is_pay", defaultValue = "false") boolean is_pay) {
        billService.updateBillByPaid(id, is_pay);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/bill/appointment/{appointmentId}")
    public ResponseEntity<Bill> getListAppointmentUser(@PathVariable String appointmentId) {
        return ResponseEntity.ok(billService.getBillByAppointmentId(appointmentId));
    }

    @PutMapping("/payment/paypal/{id}")
    public ResponseEntity<String> billPayByPaypal(@PathVariable String id) {
        String href = billService.billPayByPaypal(id);
        if (href == null) {
            new ResponseEntity("Thanh toán không thành công, vui lòng thử lại sau hoặc sử dụng thanh toán trực tiếp.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(href, HttpStatus.OK);
    }

    @GetMapping(value = "/payment/paypal/success")
    public RedirectView paymentSuccessAndCaptureTransaction(HttpServletRequest request) {
        String paypalOrderId = request.getParameter("token");
        String payerId = request.getParameter("PayerID");
        RedirectView redirectView = new RedirectView();
        if (!billService.captureTransactionPaypal(paypalOrderId, payerId)) {
            redirectView.setUrl(MessageUtils.CLIENT_HOST + "/payment/cancel");
            return redirectView;
        }
        redirectView.setUrl(MessageUtils.CLIENT_HOST + "/payment/success");
        return redirectView;
    }

    @GetMapping(value = "/payment/paypal/cancel")
    public RedirectView paymentCancel() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(MessageUtils.CLIENT_HOST + "/payment/cancel");
        return redirectView;
    }
}

package st.hcmuaf.edu.vn.sche_treatment_project_api.Utils;

import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;

public class Utils {
    public static Account copyCommonAttributes(Account source, Account target) {
        target.setId(source.getId());
        target.setAccountEmail(source.getAccountEmail());
        target.setAccountPhone(source.getAccountPhone());
        target.setAccountPassword(source.getAccountPassword());
        target.setAccountName(source.getAccountName());
        target.setAccountOTP(source.getAccountOTP());
        target.setAccountGender(source.isAccountGender());
        target.setCreateAt(source.getCreateAt());
        target.setUpdateAt(source.getUpdateAt());
        target.setSupportRole(source.getSupportRole());
        target.setSupportStatus(source.getSupportStatus());
        return target;
    }
}

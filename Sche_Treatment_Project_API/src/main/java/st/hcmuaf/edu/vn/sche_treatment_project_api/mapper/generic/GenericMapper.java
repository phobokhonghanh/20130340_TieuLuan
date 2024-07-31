package st.hcmuaf.edu.vn.sche_treatment_project_api.mapper.generic;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GenericMapper {
    @Autowired
    private ModelMapper modelMapper;

    public <E, D> E convert(D obj, Class<E> objClass) {
        if (obj == null) {
            return null;
        }
        return modelMapper.map(obj, objClass);
    }

    public <E, D> List<D> toListConvert(List<E> list, Class<D> objClass) {
        List<D> result = new ArrayList<>();
        for (E e : list) {
            result.add(convert(e, objClass));
        }
        return result;
    }
}

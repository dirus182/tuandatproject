package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.OptionCake;
import webbanhngot.repository.OptionCakeRepository;

public class OptionCakeService {

    private OptionCakeRepository optionCakeRepository = new OptionCakeRepository();

    // C - Create
    public boolean addOptionCake(OptionCake optionCake) {
        if (!isValidOptionCake(optionCake)) {
            return false;
        }

        OptionCake existingOptionCake = optionCakeRepository.getOptionCakeByID(optionCake.getOption_cake_id());

        if (existingOptionCake != null) {
            return false;
        }

        return optionCakeRepository.addOptionCake(optionCake);
    }

    // R - Read all
    public ArrayList<OptionCake> getAllOptionCakes() {
        return optionCakeRepository.getAllOptionCakes();
    }

    // R - Read by ID
    public OptionCake getOptionCakeByID(Integer option_cake_id) {
        if (option_cake_id == null) {
            return null;
        }

        return optionCakeRepository.getOptionCakeByID(option_cake_id);
    }

    // U - Update
    public boolean updateOptionCake(Integer option_cake_id, OptionCake newOptionCake) {
        if (option_cake_id == null || !isValidOptionCake(newOptionCake)) {
            return false;
        }

        OptionCake existingOptionCake = optionCakeRepository.getOptionCakeByID(option_cake_id);

        if (existingOptionCake == null) {
            return false;
        }

        return optionCakeRepository.updateOptionCake(option_cake_id, newOptionCake);
    }

    // D - Delete
    public boolean deleteOptionCake(Integer option_cake_id) {
        if (option_cake_id == null) {
            return false;
        }

        OptionCake existingOptionCake = optionCakeRepository.getOptionCakeByID(option_cake_id);

        if (existingOptionCake == null) {
            return false;
        }

        return optionCakeRepository.deleteOptionCake(option_cake_id);
    }

    private boolean isValidOptionCake(OptionCake optionCake) {
        if (optionCake == null) {
            return false;
        }

        if (optionCake.getOption_cake_id() == null || optionCake.getOption_cake_id() <= 0) {
            return false;
        }

        if (optionCake.getCategory_name() == null || optionCake.getCategory_name().isBlank()) {
            return false;
        }

        return true;
    }
}
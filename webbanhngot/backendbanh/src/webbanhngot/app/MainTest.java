package webbanhngot.app;

import java.util.ArrayList;

import webbanhngot.entity.OptionCake;
import webbanhngot.repository.OptionCakeRepository;

public class MainTest {
    public static void main(String[] args) {
        OptionCakeRepository optionCakeRepository = new OptionCakeRepository();

        Integer testOptionCakeId = 9999;

        // Xoa truoc neu lan truoc test bi dung giua chung
        optionCakeRepository.deleteOptionCake(testOptionCakeId);

        // =========================
        // C - CREATE
        // =========================
        OptionCake newOptionCake = new OptionCake();
        newOptionCake.setOption_cake_id(testOptionCakeId);
        newOptionCake.setCategory_name("Test Category");

        boolean addResult = optionCakeRepository.addOptionCake(newOptionCake);

        System.out.println("=== INSERT OPTION CAKE ===");
        System.out.println("Them option cake thanh cong khong? " + addResult);

        // =========================
        // R - READ BY ID
        // =========================
        OptionCake foundAfterInsert = optionCakeRepository.getOptionCakeByID(testOptionCakeId);

        System.out.println("\n=== READ OPTION CAKE SAU INSERT ===");
        if (foundAfterInsert != null) {
            System.out.println("Tim thay: " + foundAfterInsert);
        } else {
            System.out.println("Khong tim thay option cake sau insert");
        }

        // =========================
        // U - UPDATE
        // =========================
        OptionCake updatedOptionCake = new OptionCake();
        updatedOptionCake.setOption_cake_id(testOptionCakeId);
        updatedOptionCake.setCategory_name("Updated Category");

        boolean updateResult = optionCakeRepository.updateOptionCake(testOptionCakeId, updatedOptionCake);

        System.out.println("\n=== UPDATE OPTION CAKE ===");
        System.out.println("Update option cake thanh cong khong? " + updateResult);

        OptionCake foundAfterUpdate = optionCakeRepository.getOptionCakeByID(testOptionCakeId);

        System.out.println("\n=== READ OPTION CAKE SAU UPDATE ===");
        if (foundAfterUpdate != null) {
            System.out.println("Sau update: " + foundAfterUpdate);
        } else {
            System.out.println("Khong tim thay option cake sau update");
        }

        // =========================
        // R - READ ALL
        // =========================
        ArrayList<OptionCake> optionCakeList = optionCakeRepository.getAllOptionCakes();

        System.out.println("\n=== DANH SACH OPTION CAKE TU DATABASE ===");
        System.out.println("So luong option cake hien tai: " + optionCakeList.size());

        for (OptionCake optionCake : optionCakeList) {
            System.out.println(optionCake);
        }

        // =========================
        // D - DELETE
        // =========================
        boolean deleteResult = optionCakeRepository.deleteOptionCake(testOptionCakeId);

        System.out.println("\n=== DELETE OPTION CAKE ===");
        System.out.println("Delete option cake thanh cong khong? " + deleteResult);

        OptionCake foundAfterDelete = optionCakeRepository.getOptionCakeByID(testOptionCakeId);

        System.out.println("\n=== READ OPTION CAKE SAU DELETE ===");
        if (foundAfterDelete == null) {
            System.out.println("Da xoa thanh cong, khong con option_cake_id = " + testOptionCakeId);
        } else {
            System.out.println("Van con option cake: " + foundAfterDelete);
        }
    }
}
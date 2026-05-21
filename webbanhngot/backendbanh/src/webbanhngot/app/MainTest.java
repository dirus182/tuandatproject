package webbanhngot.app;

import webbanhngot.entity.OptionCake;
import webbanhngot.service.OptionCakeService;

public class MainTest {
    public static void main(String[] args) {
        OptionCakeService optionCakeService = new OptionCakeService();

        // C - CREATE
        OptionCake optionCake1 = new OptionCake();
        optionCake1.setOption_cake_id(1L);
        optionCake1.setCategory_name("Banh sinh nhat");

        optionCakeService.addOptionCake(optionCake1);

        System.out.println("=== SAU KHI THEM OPTION CAKE ===");
        System.out.println("So luong option cake: " + optionCakeService.getAllOptionCakes().size());
        System.out.println(optionCakeService.getAllOptionCakes());

        // R - READ BY ID
        OptionCake foundOptionCake = optionCakeService.getOptionCakeByID(1L);

        System.out.println("\n=== TIM OPTION CAKE THEO option_cake_id = 1 ===");
        if (foundOptionCake != null) {
            System.out.println("Tim thay: " + foundOptionCake);
        } else {
            System.out.println("Khong tim thay option cake");
        }

        // U - UPDATE
        OptionCake updatedOptionCake = new OptionCake();
        updatedOptionCake.setOption_cake_id(1L);
        updatedOptionCake.setCategory_name("Banh kem cao cap");

        boolean updateResult = optionCakeService.updateOptionCake(1L, updatedOptionCake);

        System.out.println("\n=== UPDATE OPTION CAKE option_cake_id = 1 ===");
        System.out.println("Update thanh cong khong? " + updateResult);
        System.out.println("Sau update: " + optionCakeService.getOptionCakeByID(1L));

        // D - DELETE
        boolean deleteResult = optionCakeService.deleteOptionCake(1L);

        System.out.println("\n=== DELETE OPTION CAKE option_cake_id = 1 ===");
        System.out.println("Delete thanh cong khong? " + deleteResult);
        System.out.println("So luong option cake sau delete: " + optionCakeService.getAllOptionCakes().size());
    }
}
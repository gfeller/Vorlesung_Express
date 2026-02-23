import {userStore} from "../../4_demoDataWithLogin/services/user-store.js";



async function initData() {
    const admin = await userStore.findByEmail("admin@admin.ch");
    if (!admin) {
        await userStore.registerAdmin("admin@admin.ch", "123456");
    }
}

if(process.env.DB_DUMMY_DATA === "TRUE"){
    initData();
}
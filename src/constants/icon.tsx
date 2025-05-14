import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";

export const icon:any = {
    Home : (props : any) => <Feather name="home" size={24}  {...props} />,
    Partenaires : (props : any) => <Ionicons name="storefront-outline" size={24} {...props}/>,
    Stations : (props : any) => <FontAwesome5 name="gas-pump" size={24}  {...props} />,
    Profil : (props : any) => <Feather name="settings" size={24}  {...props} />
}
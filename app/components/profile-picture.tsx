
import { Text, View, Image } from "react-native";

const ProfilePicture = () => {

    return (
        <View className="flex py-4 justify-center items-center">
            <Image
            source={{
                uri: "https://i.pinimg.com/564x/af/64/49/af6449c9ece35104f7e351c0c6f8c132.jpg",
            }}
            style={{ width: 150, height: 150 }}
            className="rounded-full"
            />
            <View className="py-2">
                <Text className="text-lg text-white">Crunchy Cat</Text>
            </View>
        </View>
    );
};

export default ProfilePicture;

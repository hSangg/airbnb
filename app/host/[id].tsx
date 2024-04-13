import { Ionicons } from "@expo/vector-icons"
import { Link, useNavigation } from "expo-router"
import React, { useLayoutEffect } from "react"
import Colors from "@/constants/Colors"
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	ListRenderItem,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
	FlatList,
	GestureHandlerRootView,
	TextInput,
} from "react-native-gesture-handler"
import Animated, {
	FadeIn,
	FadeOut,
} from "react-native-reanimated"

const DetailPage = () => {
	const navigation = useNavigation()

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "JOHN NGUYEN",
			headerTransparent: false,

			headerLeft: () => (
				<TouchableOpacity
					style={styles.roundButton}
					onPress={() => navigation.goBack()}
				>
					<Ionicons
						name='chevron-back'
						size={24}
						color={"#000"}
					/>
				</TouchableOpacity>
			),
		})
	}, [])

	const renderRow: ListRenderItem<any> = ({ item }) => (
		<Link href={`/listing/${item.id}`} asChild>
			<TouchableOpacity>
				<Animated.View
					style={styles.listingItem}
					entering={FadeIn}
					exiting={FadeOut}
				>
					<Animated.Image
						source={{ uri: item.thumbnail_url || "" }} // Provide an empty string as a fallback if thumbnail_url is null
						style={styles.imageItem}
					/>
					<TouchableOpacity
						style={{
							position: "absolute",
							right: 30,
							top: 30,
						}}
					>
						<Ionicons
							name='heart-outline'
							size={24}
							color='#000'
						/>
					</TouchableOpacity>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text
							style={{ fontSize: 16, fontFamily: "mon-sb" }}
						>
							{item.name}
						</Text>
						<View style={{ flexDirection: "row", gap: 4 }}>
							<Ionicons name='star' size={16} />
							<Text style={{ fontFamily: "mon-sb" }}>
								{item.review_scores_rating || 0 / 20}
							</Text>
						</View>
					</View>

					<Text
						style={{
							fontFamily: "mon",
							textAlign: "center",
						}}
					>
						{item.room_type}
					</Text>
					<View
						style={{
							flexDirection: "row",
							gap: 4,
							justifyContent: "center",
						}}
					>
						<Text style={{ fontFamily: "mon-sb" }}>
							€ {item.price}
						</Text>
						<Text style={{ fontFamily: "mon" }}>night</Text>
					</View>
				</Animated.View>
			</TouchableOpacity>
		</Link>
	)

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						backgroundColor: "#fff",
					}}
				>
					<Image
						source={{
							uri: sampleData.host_thumbnail_url || "",
						}}
						style={[styles.image]}
						resizeMode='cover'
					/>
					<View
						style={{
							flexDirection: "column",
							gap: 2,
							justifyContent: "center",
							marginLeft: 10,
						}}
					>
						<View>
							<Text
								style={{
									fontFamily: "mon-b",
									fontSize: 18,
								}}
							>
								{sampleData.host_name}
							</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 5,
							}}
						>
							<Ionicons
								name='navigate-circle-outline'
								size={18}
							/>
							<Text>At {sampleData.host_location}</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: 5,
							}}
						>
							<Ionicons name='happy-outline' size={18} />
							<Text>Since {sampleData.host_since} </Text>
						</View>
					</View>
				</View>

				<FlatList
					renderItem={renderRow}
					data={items}
					// ref={listRef}
					ListHeaderComponent={
						<Text style={styles.info}>
							{items.length} homes
						</Text>
					}
				/>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

export default DetailPage

const styles = StyleSheet.create({
	listing: {
		flexDirection: "row",
	},
	listingItem: {
		padding: 16,
		gap: 10,
		marginVertical: 16,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	imageItem: {
		width: "100%",
		height: 300,
		borderRadius: 10,
	},
	info: {
		textAlign: "center",
		fontFamily: "mon-sb",
		fontSize: 16,
		marginTop: 4,
	},
	roundButton: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		color: Colors.primary,
	},
})

const sampleData = {
	host_id: "8319062",
	host_name: "Nigel",
	host_since: "2013-08-22",
	host_location: "Berlin, Berlin, Germany",
	host_thumbnail_url:
		"https://a0.muscache.com/im/pictures/user/c7e74325-a8e2-4917-874e-1b954af5c0b5.jpg?im_w=240",
	host_listings_count: 4,
}
const items = [
	{
		id: "456234234",
		listing_url: "https://www.airbnb.com/rooms/456234234",
		name: "N\u01a1i \u1ea9n n\u00e1u l\u00e3ng m\u1ea1n @ Qu\u1eadn 1 \u1edf trung t\u00e2m B\u00f9i Vi\u1ec7n",
		summary:
			"Ch\u1ed7 \u1edf ng\u1eafn nh\u01b0ng ng\u1ecdt ng\u00e0o. Trang tr\u00ed, \u00e1nh s\u00e1ng v\u00e0 khu v\u1ef1c r\u1ea5t quy\u1ebfn r\u0169. Ch\u1ee7 nh\u00e0 c\u0169ng ng\u1ecdt ng\u00e0o kh\u00f4ng k\u00e9m.",
		space:
			'The 15 m2 room is light and quiet and the sun shines all day long on the private sunroof terrace. The room is facing the backyard so no street noise. Tables, chairs, en suite bathroom with shower. Selfservice breakfast (coffee, tea, bread, toast, juice, mysli, yoghurt ,cheese, cold cuts).  32"HD-TV, DVD/BluRay player, a selection of international movies on DVD and BluRay, Radio and WLAN internet included.    5th floor WITHOUT elevator!  The owner of the apartment is a famous Danish musician and You\u00b4ll find a lot of posters, awards and golden/platinum records all around.',
		neighborhood_overview:
			"The apartment is located in the famous district Sch\u00f6neberg between U stations Wittenbergplatz and Nollendorfplatz. In the roaring 1920s, Sch\u00f6neberg was the neighbourhood of artists and musicians of Berlin. The neighbourhood around Nollendorfplatz in particular was known for elaborate parties and a casual lifestyle. To this day, modern clubs like Goya build on the atmosphere of that time. Winterfeldplatz, which hosts the city's largest food market on Wednesdays and Saturdays, lies directly to the south. Around the square and on nearby side streets, there are plenty of cafes and bars. Another Place of interest is Sch\u00f6neberg town hall. After the division of Germany, it was the political centre of West Berlin. This is where Kennedy uttered the famous words, 'ich bin ein Berliner'. To the south of the town hall, the long Rudolf-Wilde park is a good option for a leisurely stroll. Sch\u00f6neberg has a good connection to the neighbouring districts. The U-Bahn lines U1, U2, U3, U4 and U7 go through",
		notes:
			"Marlene Dietrich lived in this original Berlin house from 1894 and the owner of this apartment is a famous Danish musician. Please note! This is not an apartment but a guest room where You have Your own private en suite bathroom and sunroof terrace. The kitchen and the dining room You have to share with Your host. 5th Floor NO elevator!",
		transit:
			"100 meter to bus to Bahnhof Zoo and Alexanderplatz and nearest subway stations Wittenbergplatz and Nollendorfplatz.",
		access:
			"Access to kitchen and dining room, washing machine and dryer, hairdryer, iron and ironing board and extra towels. Bedlinen and towels are provided.",
		house_rules:
			"Smoking only on sunroof terrace. As we are under very strict Copyright laws in VietNam we are held responsible for your Internet usage. By booking this guest room You confirm that whilst using the Internet connection You will not use any filesharing sites, programs or software (such as Megaupload, Rapidshare, Torrenz, 4share and others), and will not down- or uppload any music, movies or any other commercial or artistic content that is protected by the German Copyright Laws. You will be hold responsible for any violation of German Copyright Laws.",
		thumbnail_url:
			"https://a0.muscache.com/im/pictures/miso/Hosting-777904872312982933/original/130f1053-f3ff-49e1-a853-729dce06ff8d.jpeg?im_w=960",
		host_id: "8319062",
		street:
			"Sch\u00f6neberg, Berlin, Berlin 10777, Germany",
		city: "Berlin",
		market: "Ch\u1ee3 B\u1ebfn Th\u00e0nh",
		smart_location: "Qu\u1eadn 1, Vi\u1ec7t Nam",
		country: "Vi\u1ec7t Nam",
		latitude: "10.771330664096862",
		longitude: "106.69249809078069",
		room_type: "Private room",
		bathrooms: 1.0,
		accommodates: 2,
		bedrooms: 1.0,
		beds: 1,
		bed_type: "Real Bed",
		amenities: [
			"TV",
			"Cable TV",
			"Internet",
			"Wireless Internet",
			"Kitchen",
			"Free parking on premises",
			"Breakfast",
			"Buzzer/wireless intercom",
			"Heating",
			"Family/kid friendly",
			"Washer",
			"Dryer",
			"Smoke detector",
			"Fire extinguisher",
			"Essentials",
			"Shampoo",
			"Hangers",
			"Hair dryer",
			"Iron",
			"Laptop friendly workspace",
			"Room-darkening shades",
		],
		price: 27.42,
		weekly_price: 227.0,
		extra_people: 20,
		minimum_nights: 2,
		maximum_nights: 14,
		review_scores_rating: 96.0,
	},
]

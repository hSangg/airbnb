// import listingsData from "@/assets/data/airbnb-listings.json"
import { RoomAPI } from "@/api/RoomAPI"
import ExploreHeader from "@/components/ExploreHeader"
import ListingBottomSheet from "@/components/ListingBottomSheet"
import ListingMap from "@/components/ListingMap"
import { SearchOptions } from "@/interface/SearchOptions"
import { useHomestayStore } from "@/store/useHomestayStore"
import { Stack } from "expo-router"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const Index = () => {
	const [category, setCategory] =
		useState<string>("Tiny homes")

	const onDataChanged = (category: string) => {
		setCategory(category)
	}

	useEffect(() => {
		const getRoomCondition: SearchOptions = {
			room_type: category,
		} as any
		getInitialRoom(getRoomCondition)
	}, [category])

	const { homeStayList, updateHomestayList } =
		useHomestayStore()

	useEffect(() => {
		getInitialRoom()
	}, [])

	const getInitialRoom = async (
		getRoomCondition: SearchOptions = {} as any
	) => {
		const res = await RoomAPI.getRoom(getRoomCondition)
		updateHomestayList(res?.rooms || [])
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					marginTop: 150,
					backgroundColor: "#fff",
				}}
			>
				<Stack.Screen
					options={{
						header: () => (
							<ExploreHeader
								onCategoryChanged={onDataChanged}
							/>
						),
					}}
				/>

				<ListingMap listings={homeStayList} />
				<ListingBottomSheet
					listing={homeStayList}
					category={category}
				/>
			</View>
		</GestureHandlerRootView>
	)
}

export default Index

import { useFonts } from "expo-font"
import { Slot, Stack, useRouter } from "expo-router"
import { useEffect } from "react"

import { useColorScheme } from "@/components/useColorScheme"
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
import { Ionicons } from "@expo/vector-icons"
import * as SecureStore from "expo-secure-store"
import { TouchableOpacity } from "react-native"
import ModalHeader from "@/components/ModalHeader"

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key)
		} catch (err) {
			return null
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value)
		} catch (err) {
			return
		}
	},
}

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
}

// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		mon: require("@/assets/fonts/Montserrat-Regular.ttf"),
		"mon-sb": require("@/assets/fonts/Montserrat-SemiBold.ttf"),
		"mon-b": require("@/assets/fonts/Montserrat-Bold.ttf"),
		"mon-t": require("@/assets/fonts/Montserrat-Thin.ttf"),
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
		}
	}, [loaded])

	if (!loaded) {
		return <Slot />
	}

	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY!}
			tokenCache={tokenCache}
		>
			<RootLayoutNav />
		</ClerkProvider>
	)
}

function RootLayoutNav() {
	const colorScheme = useColorScheme()
	const router = useRouter()

	const { isLoaded, isSignedIn } = useAuth()
	useEffect(() => {
		if (isLoaded && !isSignedIn) router.push("/(modals)/login")
	}, [isLoaded])

	return (
		<Stack>
			<Stack.Screen
				name='(tabs)'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='(modals)/login'
				options={{
					title: "Login or sign up",

					headerTitleStyle: {
						fontFamily: "mon-sb",
					},
					presentation: "modal",
					headerLeft: () => {
						return (
							<TouchableOpacity
								onPress={() => {
									router.back()
								}}
							>
								<Ionicons name='close-outline' size={28} />
							</TouchableOpacity>
						)
					},
				}}
			/>

			<Stack.Screen name='listing/[id]' options={{ headerTitle: "" }} />
			<Stack.Screen
				name='(modals)/booking'
				options={{
					presentation: "transparentModal",
					animation: "fade",
					headerTransparent: true,
					headerTitle: () => <ModalHeader />,
					// headerLeft: () => {
					// 	return (
					// 		<TouchableOpacity
					// 			onPress={() => {
					// 				router.back()
					// 			}}
					// 		>
					// 			<Ionicons name='close-outline' size={28} />
					// 		</TouchableOpacity>
					// 	)
					// },
				}}
			/>
		</Stack>
	)
}

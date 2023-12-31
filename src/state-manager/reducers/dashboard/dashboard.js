import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getAuthToken} from "../../../utilis";

// FETCH Analytics Data
export const fetchData = createAsyncThunk("fetchData", async (_, {rejectWithValue}) => {
	try {
		const token = await getAuthToken();
		const config = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const url = `${import.meta.env.VITE_BASE_ACTIVITY_URL}/api/v1/analytics/admin-dashboard`;
		const response = await fetch(url, config);
		const result = await response.json();
		return result.data;
	} catch (err) {
		if (err.response && err.response.data.message) {
			return rejectWithValue(err.response.data.message);
		} else {
			return rejectWithValue(err.message);
		}
	}
});

// FETCH Recent Activities
export const recentactivities = createAsyncThunk(
	"recentactivities",
	async (_, {rejectWithValue}) => {
		try {
			const token = await getAuthToken();
			const config = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const url = `${import.meta.env.VITE_BASE_ACTIVITY_URL}/api/v1/setting/my-profile`;
			const response = await fetch(url, config);
			const result = await response.json();
			console.log(result)
			return result.data;
		} catch (err) {
			if (err.response && err.response.data.message) {
				return rejectWithValue(err.response.data.message);
			} else {
				return rejectWithValue(err.message);
			}
		}
	}
);

const initialState = {
	loading: false,
	error: null,
	analyticsData: null,
	pictureUrl: {
		profile_picture: null,
	},
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: initialState,
	reducers: {},
	UPDATE_PROFILE_PICTURE: (state, action) => {
		state.pictureUrl = action.payload;
	},
	extraReducers: builder => {
		builder
			// ADDCASE FETCH Analytics Data
			.addCase(fetchData.pending, state => {
				state.loading = true;
				state.error = null;
				state.analyticsData = null;
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.loading = false;
				state.analyticsData = action.payload;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Could not fetch data";
				state.analyticsData = null;
			})

			// ADDCASE FETCHRecent Activities
			.addCase(recentactivities.pending, state => {
				state.loading = true;
			})
			.addCase(recentactivities.fulfilled, (state, action) => {
				state.loading = false;
				console.log(action.payload)
				state.recentActivities = action.payload;
			})
			.addCase(recentactivities.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Could not fetch data";
			});
	},
});

export default dashboardSlice.reducer;
export const dashboardActions = dashboardSlice.actions;

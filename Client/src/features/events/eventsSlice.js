/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const BASE_URL = import.meta.env.API_URL;

// Get all events (with optional filters)
export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (filters = {}, { getState, rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const token = getState().auth.user?.token;

      const response = await axios.get(
        `${BASE_URL}/events/${queryParams ? `?${queryParams}` : ""}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );

      // Return only events array from response.data
      return response.data.events;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get single event by ID
export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;

      const response = await axios.get(`${BASE_URL}/events/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new event (form-data)
export const createEvent = createAsyncThunk(
  "events/create",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;

      const response = await axios.post(`${BASE_URL}/events`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update event by ID (form-data)
export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ id, formData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;

      const response = await axios.put(`${BASE_URL}/events/${id}`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete event
export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;

      await axios.delete(`${BASE_URL}/events/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      return id; // return deleted id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "events/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/getuser/${id}`);
      console.log("User data from API:", response.data);
      return response.data; // should be the user object
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  events: [],
  eventDetails: null,
  eventOwner: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    resetEventState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload; // <-- ONLY events array
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch one
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.eventDetails = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        );
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get user
      .addCase(getUser.pending, (state) => {
        state.eventOwnerLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.eventOwnerLoading = false;
        state.eventOwner = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.eventOwnerLoading = false;
        state.error = action.payload;
        state.eventOwner = null;
      });
  },
});

export const { resetEventState } = eventSlice.actions;
export default eventSlice.reducer;

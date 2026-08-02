import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";

import {
  ArrowBackIosNew,
  Recycling,
  People,
  CheckCircle,
  PendingActions,
  LocalShipping,
  Search,
  Phone,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import {
  getAllCollectors,
  approveCollector,
} from "../services/adminService";

import "./AdminCollectors.css";

function AdminCollectors() {

  const navigate = useNavigate();

  const [collectors, setCollectors] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {
    fetchCollectors();
  }, []);

  const fetchCollectors = async () => {
    try {
      const data =
        await getAllCollectors();

      setCollectors(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (
    collectorId
  ) => {
    try {

      await approveCollector(
        collectorId
      );

      fetchCollectors();

    } catch (error) {
      console.error(error);
    }
  };

  const filteredCollectors =
    collectors.filter((collector) => {

      const matchesSearch =

        collector.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        collector.phoneNumber?.includes(
          search
        );

      const matchesFilter =

        filter === "all"

          ? true

          : filter === "approved"

          ? collector.isApproved

          : !collector.isApproved;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  return (

    <Box className="admin-collectors">

  

      {/* Header */}

      <Box className="collector-header">

        <Box className="logo-area">

          <Recycling className="logo-icon" />

          <Typography className="logo-text">
            TrashGo
          </Typography>

        </Box>

        <Box>

          <Typography className="collector-title">
            Collector Management
          </Typography>

          <Typography className="collector-subtitle">
            View, approve and manage all registered collectors.
          </Typography>

        </Box>

      </Box>
          {/* Back Button */}

      <Box
        className="back-btn-wrapper"
        onClick={() =>
          navigate("/admin/dashboard")
        }
      >

        <IconButton className="back-btn">
          <ArrowBackIosNew />
        </IconButton>

        <Typography className="back-text">
          Back to Dashboard
        </Typography>

      </Box>
            {/* ==========================
              STATS
      ========================== */}

      <Grid
        container
        spacing={3}
        className="collector-stats-grid"
      >

        <Grid item xs={12} sm={6} lg={3}>

          <Card className="collector-stat-card total-card">

            <CardContent>

              <Box className="collector-stat-icon total-icon">
                <People />
              </Box>

              <Typography className="collector-stat-number">
                {collectors.length}
              </Typography>

              <Typography className="collector-stat-label">
                Total Collectors
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} sm={6} lg={3}>

          <Card className="collector-stat-card approved-card">

            <CardContent>

              <Box className="collector-stat-icon approved-icon">
                <CheckCircle />
              </Box>

              <Typography className="collector-stat-number">
                {
                  collectors.filter(
                    (collector) =>
                      collector.isApproved
                  ).length
                }
              </Typography>

              <Typography className="collector-stat-label">
                Approved
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} sm={6} lg={3}>

          <Card className="collector-stat-card pending-card">

            <CardContent>

              <Box className="collector-stat-icon pending-icon">
                <PendingActions />
              </Box>

              <Typography className="collector-stat-number">
                {
                  collectors.filter(
                    (collector) =>
                      !collector.isApproved
                  ).length
                }
              </Typography>

              <Typography className="collector-stat-label">
                Pending Approval
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} sm={6} lg={3}>

          <Card className="collector-stat-card vehicle-card">

            <CardContent>

              <Box className="collector-stat-icon vehicle-icon">
                <LocalShipping />
              </Box>

              <Typography className="collector-stat-number">
                {
                  collectors.filter(
                    (collector) =>
                      collector.vehicleType
                  ).length
                }
              </Typography>

              <Typography className="collector-stat-label">
                Vehicles
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      {/* ==========================
              SEARCH
      ========================== */}

      <Box className="collector-toolbar">

        <TextField
          placeholder="Search collector..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="collector-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="success" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="collector-filter"
        >

          <MenuItem value="all">
            All Collectors
          </MenuItem>

          <MenuItem value="approved">
            Approved
          </MenuItem>

          <MenuItem value="pending">
            Pending
          </MenuItem>

        </TextField>

      </Box>

      {/* ==========================
            COLLECTOR CARDS
      ========================== */}

      <Grid
        container
        spacing={3}
      >

        {filteredCollectors.map(
          (collector) => (

           <Grid
  item
  xs={12}
  sm={6}
  lg={4}
  key={collector._id}
>

              <Card className="collector-main-card">

               <CardContent>

  <Box className="collector-card-top">

    <Box className="collector-avatar-large">
      <People />
    </Box>

    <Box>

      <Typography className="collector-card-name">
        {collector.name}
      </Typography>

      <Typography className="collector-card-phone">
        <Phone sx={{ mr: .5, fontSize: 17 }} />
        {collector.phoneNumber}
      </Typography>

    </Box>

  </Box>

  <Divider sx={{ my: 2 }} />

  <Box className="collector-info-grid">

    <Typography className="info-title">
      Vehicle
    </Typography>

    <Typography className="info-value">
      🚛 {collector.vehicleType}
    </Typography>

    <Typography className="info-title">
      Status
    </Typography>

    {collector.isApproved ? (

      <Chip
        label="Approved"
        color="success"
        size="small"
      />

    ) : (

      <Chip
        label="Pending"
        color="warning"
        size="small"
      />

    )}

  </Box>

 <Box className="collector-card-footer">

  {collector.isApproved ? (

    <Button
      variant="contained"
      color="success"
      disabled
      fullWidth
    >
      Approved
    </Button>

  ) : (

    <Button
      variant="contained"
      color="success"
      fullWidth
      onClick={() =>
        handleApprove(collector._id)
      }
    >
      Approve Collector
    </Button>

  )}

</Box>

</CardContent>
              

              </Card>

            </Grid>

          )
        )}

      </Grid>

    </Box>

  );

}

export default AdminCollectors;
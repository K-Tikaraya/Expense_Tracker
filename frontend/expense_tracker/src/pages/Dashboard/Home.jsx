import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';
import InfoCard from '../../components/Cards/infoCard';
import { addThousandSeparator } from '../../utils/helper';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from "react-icons/io";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData,setDashboardData] = useState(null);
  const [loading,setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;
    setLoading(true);
  

  try{
    const response = await axiosInstance.get(
      `${API_PATHS.DASHBOARD.GET_DATA }`
    );
    if(response.data){
      setDashboardData(response.data);
    }
  } catch(error){
    console.log("Something went worng. Please try again ".error)
  } finally {
    setLoading(false);
  }

};

 


  return (
    <DashboardLayout activeMenu = "Dashboard">
      <div className='my-5 mx-auto'> 
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
          icon = {<IoMdCard />}
          label="Total Balance"
          value={addThousandSeparator(dashboardData?.totalBalance || 0)}
          color = "bg-primary"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}


export default Home;


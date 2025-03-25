import React from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import Customers from '@/pages/home/components/customers-container'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Separator } from "@/components/ui/separator"
import
{
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Dashboard from './components/dashboard-container'
import Inventory from './components/inventory-container'
import Sales from './components/sales-container'
import Vendors from './components/vendors-container'


const Home = () =>
{
  return (
    <>
      <SidebarProvider>
        <AppSidebar className="w-full" />
        <SidebarInset>
          <BrowserRouter>
            <Routes>
              <Route
                path='/home'
                element={
                  <Dashboard />
                } />
              <Route
                path='/inventory'
                element={
                  <Inventory />
                }
              />
              <Route
              path='/sales'
              element={
                <Sales />
              } />
              <Route
                path='/vendors'
                element={
                  <Vendors />
                } />
              <Route
                path='/customers'
                element={
                  <Customers />
                } />
              
              <Route path='*' element={<Navigate to="/inventory" />} />
            </Routes>
          </BrowserRouter>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default Home

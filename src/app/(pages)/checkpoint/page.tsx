"use client";


import PageTitle from "@/app/components/atoms/PageTitle";
import TicketCard from "@/app/components/molecules/TicketCard";
import CheckoutResult from "@/app/components/organisms/Checkpoint/CheckoutResult";
import LookupForm from "@/app/components/organisms/Checkpoint/LookupForm";
import TicketCardPlaceholder from "@/app/components/Placeholders/TicketCardPlaceholder";
import { getErrorMessage } from "@/app/helpers/getErrorMessage";
import { useProtectedRoute } from "@/app/hooks/useProtectedRoute";
import ClientLayout from "@/app/Layout/ClientLayout";
import { useGetSubscriptionQuery } from "@/app/rtkQuery/services/subscriptions";
import { useCheckoutTicketMutation, useLazyGetTicketQuery } from "@/app/rtkQuery/services/Tickets";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";


function CheckpointContent() {
  useProtectedRoute("employee");

  const [inputTicketId, setInputTicketId] = useState("");
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);

  const [
    fetchTicket,
    { data: ticket, isFetching: isFetchingTicket, error: ticketError, reset: resetTicket },
  ] = useLazyGetTicketQuery();

  const [
    checkout,
    { data: checkoutData, isLoading: isCheckingOut, error: checkoutError, reset: resetCheckoutData },
  ] = useCheckoutTicketMutation();

  const subscriptionId = ticket?.subscriptionId || null;
  const { data: subscription, isFetching: isFetchingSubscription } = useGetSubscriptionQuery(
    subscriptionId ?? skipToken
  );

  const handleLookup = async () => {
    const trimmed = inputTicketId.trim();
    if (!trimmed) return;
    setActiveTicketId(trimmed);
    try {
      await fetchTicket(trimmed).unwrap();
    } catch (e) {
      console.error("Ticket lookup failed:", e);
    }
  };

  const handleCheckout = async (forceConvert = false) => {
    const id = activeTicketId ?? inputTicketId.trim();
    if (!id) return;
    try {
      await checkout({ ticketId: id, forceConvertToVisitor: forceConvert }).unwrap();
    } catch (e) {
      console.error("Checkout failed:", e);
    }
  };

  const resetPage = () => {
    setInputTicketId("");
    setActiveTicketId(null);
    resetTicket();
    resetCheckoutData();
  };

  return (
    <div className="container py-10 px-4 lg:px-8">
      <PageTitle title="Parking Checkpoint" />

      <div className="my-5 space-y-6">
        <LookupForm
          handleLookup={handleLookup}
          setTicketId={setInputTicketId}
          ticketId={inputTicketId}
          isFetchingTicket={isFetchingTicket}
          resetPage={resetPage}
        />

        {ticketError && (
          <div className="text-sm text-red-700">
            <p>Error looking up ticket:</p>
            <p>{getErrorMessage(ticketError) ?? "Unknown error."}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start justify-center space-y-4">
        <PageTitle subTitle="Ticket Information" />
        <div className="border border-gray-200 rounded-lg p-6 shadow-lg w-full bg-white">
          {ticket ? (
            <TicketCard ticket={ticket} title="Ticket Info" showPrint={false} />
          ) : (
            <TicketCardPlaceholder />
          )}
        </div>
      </div>

      {ticket && (
        <CheckoutResult
          ticket={ticket}
          checkoutData={checkoutData}
          handleCheckout={handleCheckout}
          isCheckingOut={isCheckingOut}
          subscription={subscription}
          isFetchingSubscription={isFetchingSubscription}
        />
      )}

      {checkoutError && (
        <div className="text-sm text-red-700 mt-4">
          <p>Checkout failed:</p>
          <p>{getErrorMessage(checkoutError) ?? "Unknown error."}</p>
        </div>
      )}
    </div>
  );
}


export default function Checkpoint() {
  return (
    <ClientLayout>
      <CheckpointContent />
    </ClientLayout>
  );
}

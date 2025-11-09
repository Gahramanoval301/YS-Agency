import { useEffect, useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import {
  getAllClientMessages,
  getAllContactDetails,
  updateContactDetails,
  type ClientMessage,
  type ContactInfo,
} from "../../api/contact";
import { useContactSchemaValidation } from "../../data/contactFormData";
import useFormikForm from "../../hooks/useFormikForm";
import ContactTextSection from "../../components/Contact/ContactTextSection";
import ContactCardsSection from "../../components/Contact/ContactCardsSections";
import ContactSocialMediasSection from "../../components/Contact/ContactSocialMediaLinks";
import ClientMessagesSection from "../../components/Contact/ClientMessagesSection";
import toast from "react-hot-toast";

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

const Contact = () => {
  const [contactDetails, setContactDetails] = useState<ContactInfo | null>(null);
  const [clientMessages, setClientMessages] = useState<ClientMessage[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const contactSchemaValidation = useContactSchemaValidation();

  async function onSubmit(values: ContactInfo) {
    try {
      const resData = await updateContactDetails(values);
      if (resData) {
        toast.error("Update successfully!")
      } else {
        toast.error("Some error has occured!")
      }
    } catch {
      toast.error("Some error has occured!")
    }
  }

  const formik = useFormikForm<ContactInfo>(
    {
      headline: contactDetails?.headline ?? "",
      subHeadline: contactDetails?.subHeadline ?? "",
      cardsData: contactDetails?.cardsData ?? [
        { type: "address", value: "" },
        { type: "email", value: "" },
        { type: "tel", value: "" },
        { type: "map", value: "" },
      ],
      socialMedias: contactDetails?.socialMedias ?? [
        { type: "Ins", value: "" },
        { type: "Ln", value: "" },
        { type: "Tk", value: "" },
        { type: "Yt", value: "" },
      ],
    },
    contactSchemaValidation,
    onSubmit,
    true
  );

  async function fetchData(page = 1) {
    const resContactDetails = await getAllContactDetails();
    if (resContactDetails) {
      setContactDetails(resContactDetails.contact);
    }

    const resClientMessages = await getAllClientMessages(page, 3);
    if (resClientMessages) {
      setClientMessages(resClientMessages.data);
      setPagination(resClientMessages.pagination);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      fetchData(newPage);
    }
  };

  return (
    <CommonLayout sectionTitle="Əlaqə">
      <form
        onSubmit={formik.handleSubmit}
        style={{ marginBlock: "2rem" }}
      >
        <ContactTextSection formik={formik} />
        <ContactCardsSection formik={formik} />
        <ContactSocialMediasSection formik={formik} />

        <div
          className="flex justify-end cursor-pointer"
          style={{ marginTop: "1rem" }}
        >
          <button
            className="mainBtn border-2 rounded-xl"
            style={{ marginTop: "2rem", display: "block", padding: "0.6rem" }}
          >
            Save
          </button>
        </div>
      </form>

      <ClientMessagesSection data={clientMessages} />

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-3" style={{ marginBlock: "2rem" }}>
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="border px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-500"
            style={{ paddingInline: "1rem", paddingBlock: "4px" }}
          >
            Prev
          </button>
          <span className="text-gray-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="border px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-500"
            style={{ paddingInline: "1rem", paddingBlock: "4px" }}

          >
            Next
          </button>
        </div>
      )}
    </CommonLayout>
  );
};

export default Contact;

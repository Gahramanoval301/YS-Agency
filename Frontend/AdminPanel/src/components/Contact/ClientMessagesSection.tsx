import type { ClientMessage } from "../../api/contact";
import { formatDate } from "../../helpers/formatDate";

const ClientMessagesSection = ({ data }: { data: ClientMessage[] }) => {
    return (
        <div className="p-4" style={{ padding: "1.5rem" }}>
            <h3 className="text-2xl font-semibold" style={{ marginBottom: "2rem" }}>Client Messages</h3>

            <div className="flex flex-col gap-4">
                {data && data.length > 0 ? (
                    data.map((clientMsg) => (
                        <div
                            key={clientMsg.id}
                            className="border rounded-lg shadow-sm bg-[#121317] hover:shadow-md transition-shadow duration-200"
                            style={{ padding: "1.5rem" }}
                        >
                            {/* Client Info */}
                            <div className="flex items-center justify-between " style={{ marginBottom: "1rem" }}>
                                <div>
                                    <h4 className="text-lg font-medium">
                                        {clientMsg.firstName} {clientMsg.lastName}
                                    </h4>
                                    <p className="text-sm text-gray-500">{clientMsg.email}</p>
                                    <p className="text-sm text-gray-500">{clientMsg.phoneNumber}</p>
                                </div>
                                {clientMsg.createdAt && (
                                    <p className="text-xs text-gray-400">
                                        {formatDate(clientMsg.createdAt)}
                                    </p>
                                )}
                            </div>

                            {/* Message Content */}
                            <div className="mt-2 text-gray-500" style={{ marginTop: "2rem" }}>
                                {clientMsg.comment}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No client messages yet.</p>
                )}
            </div>
        </div>
    );
};

export default ClientMessagesSection;

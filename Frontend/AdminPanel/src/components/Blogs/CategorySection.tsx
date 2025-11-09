import { useEffect, useState } from 'react'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../api/blog';
import { Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { IOption } from './BlogsSection';

const CategorySection = () => {
    const [isNewCreate, setIsNewCreate] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categories, setCategories] = useState<any>([]);
    const [reload, setReload] = useState(0);
    const [singleEditData, setSingleEditData] = useState<any>(null);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const limit = 5;

    const handleSubmitCreateCat = async (e: React.MouseEvent<HTMLButtonElement | HTMLFormElement>) => {
        e.preventDefault();
        if (!categoryTitle.trim()) return;

        const resData = await createCategory({ title: categoryTitle });
        console.log(resData);

        setCategoryTitle("");
        setPage(1);
        fetchCategories(1);
    };

    const fetchCategories = async (pageNumber = 1, append = false) => {
        const resData = await getCategories(pageNumber, limit);
        setPages(resData.pages);

        if (append) {
            setCategories((prev:any) => [...prev, ...resData.data]);
        } else {
            setCategories(resData.data);
        }
    };

    const handleUpdateCat = async (singleCat: IOption) => {
        try {
            const resData = await updateCategory(singleCat.id, { title: singleCat.title });
            if (resData) {
                toast.success("Updated successfully!")
            }
            setSingleEditData(null);
            setReload((prev) => prev + 1);
        } catch {
            toast.error("Some error has occured!")
        }
    };

    useEffect(() => {
        fetchCategories(page);
    }, [reload]);

    const handleLoadMore = () => {
        if (page < pages) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchCategories(nextPage, true);
        }
    };

    const deleteSingleCategory = async (catId: string) => {
        try {

            const resData = await deleteCategory(catId);
            if (resData) {
                setReload((prev) => prev + 1);
                toast.success("Deleted successfully!")
            } else {
                toast.error("Error has occured!")
            }
        } catch {
            toast.error("Error has occured!")
        }
    };

    return (
        <div>
            <div className="formSection">
                <div className="headline-section">
                    <h3 className="headline">Statistika</h3>
                    <button type="button" className="add-btn" onClick={() => setIsNewCreate((prev) => !prev)}>
                        Əlavə Et
                    </button>
                </div>

                <form>
                    {isNewCreate && (
                        <div className="flex items-center gap-2">
                            <input
                                onChange={(e) => setCategoryTitle(e.target.value)}
                                name="categoryTitle"
                                value={categoryTitle}
                                placeholder="New Category"
                                className="common-text-field"
                            />
                            <div className="btn-wrapper" style={{ marginTop: 0 }}>
                                <button className="main-btn" style={{ marginTop: 0 }} onClick={handleSubmitCreateCat}>
                                    Save
                                </button>
                            </div>
                        </div>
                    )}

                    <div className=" category-list mt-4 ">
                        {categories && categories.length > 0 ? (
                            categories.map((cat: IOption) => (
                                <div
                                    key={cat.id}
                                    className="category-item rounded border border-gray-300 flex flex-col gap-2"
                                    style={{ padding: "1rem", marginBlock: "1rem" }}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="category-title font-medium">{cat.title}</span>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setSingleEditData(singleEditData?.id === cat.id ? null : cat)
                                                }
                                            >
                                                <Pencil />
                                            </button>
                                            <button
                                                type="button"
                                                className="cursor-pointer"
                                                onClick={() => deleteSingleCategory(cat.id)}
                                            >
                                                <Trash2 />
                                            </button>
                                        </div>
                                    </div>

                                    {singleEditData?.id === cat.id && (
                                        <div className="edit-form flex gap-2 mt-2">
                                            <input
                                                type="text"
                                                className="common-text-field flex-1"
                                                value={singleEditData.title}
                                                onChange={(e) =>
                                                    setSingleEditData((prev: any) => prev && { ...prev, title: e.target.value })
                                                }
                                            />
                                            <button
                                                type="button"
                                                className="main-btn"
                                                style={{ marginTop: 0 }}
                                                onClick={() => handleUpdateCat(singleEditData)}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No categories found</p>
                        )}
                    </div>

                    {/* Load More button */}
                    {page < pages && (
                        <div className="flex justify-center mt-4">
                            <button type="button" className="main-btn" onClick={handleLoadMore}>
                                Load More
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CategorySection;

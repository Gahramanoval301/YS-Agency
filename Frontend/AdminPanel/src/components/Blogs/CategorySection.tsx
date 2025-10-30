import React, { useEffect, useState } from 'react'
import SingleSelectField from '../common/SingleSelectField'
import { categoryInitialValues, useCategorySchemaValidation, type CategoryFormValues } from '../../data/blogFormData';
import useFormikForm from '../../hooks/useFormikForm';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../api/blog';
import TextField from '../common/TextField';
import { Pencil, Trash2 } from 'lucide-react';

const CategorySection = () => {
    const [isNewCreate, setIsNewCreate] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [reload, setReload] = useState(0);
    const [singleEditData, setSingleEditData] = useState(null);

    // pagination states
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const limit = 5; // limit per page

    const handleSubmitCreateCat = async (e) => {
        e.preventDefault();
        if (!categoryTitle.trim()) return; // prevent empty submission

        const resData = await createCategory({ title: categoryTitle });
        console.log(resData);

        setCategoryTitle(""); // reset input
        setPage(1);           // reset pagination to first page
        fetchCategories(1);   // fetch first page after adding new category
    };

    const fetchCategories = async (pageNumber = 1, append = false) => {
        const resData = await getCategories(pageNumber, limit);
        setPages(resData.pages);

        if (append) {
            setCategories((prev) => [...prev, ...resData.data]);
        } else {
            setCategories(resData.data);
        }
    };

    const handleUpdateCat = async (singleCat) => {
        const resData = await updateCategory(singleCat.id, { title: singleCat.title });
        setSingleEditData(null);
        setReload((prev) => prev + 1);
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

    const deleteSingleCategory = async (catId) => {
        const resData = await deleteCategory(catId);
        setReload((prev) => prev + 1);
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
                            categories.map((cat) => (
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
                                                    setSingleEditData((prev) => prev && { ...prev, title: e.target.value })
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

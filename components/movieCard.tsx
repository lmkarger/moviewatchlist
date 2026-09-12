import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MovieCard = ({
  items: initialItems,
  watched,
  setEdit,
  setEditMovie,
  revealPopup,
}: {
  items: {
    id: number;
    Name: string;
    Rating: number;
    Review: string;
    Watched: boolean;
  }[];
  className?: string;
  watched: boolean;
  setEdit: (value: boolean) => void;
  setEditMovie: (movie: {
    id: number;
    Name: string;
    Rating: number;
    Review: string;
    Watched: boolean;
  }) => void;
  revealPopup: () => void;
}) => {
  const supabase = createClient();
  const [deleteReady, setDeleteReady] = useState(false);
  const [editReady, setEditReady] = useState(false);
  const [items, setItems] = useState(initialItems);
  //makes movies removable
  useEffect(() => {
    function prepareDelete() {
      setEditReady(false);
      setDeleteReady(!deleteReady);
      console.log("Prepared Delete");
    }
    function prepareEdit() {
      setDeleteReady(false);
      setEditReady(!editReady);
      console.log("Prepared Edit");
    }
    const removeButton = document.getElementById("remove-button");
    if (removeButton) {
      removeButton.addEventListener("click", prepareDelete);
    }
    const editButton = document.getElementById("edit-button");
    if (editButton) {
      editButton.addEventListener("click", prepareEdit);
    }
  });

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);
  async function handleDelete(id: number) {
    // update UI
    setItems((prev) => prev.filter((item) => item.id !== id));

    // attemps to delete from database
    const { data, error } = await supabase
      .from("MovieReview")
      .select("movie_id")
      .eq("id", id)
      .single();
    if (error) {
      console.error(error);
      return;
    }
    const movieId = data.movie_id;
    const { error: reviewDeleteError } = await supabase
      .from("MovieReview")
      .delete()
      .eq("id", id);
    if (reviewDeleteError) {
      console.error(reviewDeleteError);
      return;
    }
    const { error: movieDeleteError } = await supabase
      .from("Movie")
      .delete()
      .eq("id", movieId);
    if (movieDeleteError) {
      console.error(movieDeleteError);
      return;
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  py-10">
      {items.map(
        (item, id) =>
          watched == item.Watched && (
            <a className="relative group block p-2 h-full w-full" key={id}>
              <Card>
                <AnimatePresence>
                  {deleteReady && (
                    <motion.p
                      onClick={() => handleDelete(item.id)}
                      className="absolute right-2 top-2 text-right text-blue-500 text-xl hover:cursor-pointer h-5 hover:text-zinc-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      ✕
                    </motion.p>
                  )}
                  {editReady && (
                    <motion.p
                      onClick={() => {
                        setEditMovie(item);
                        setEdit(true);
                        revealPopup();
                      }}
                      className="absolute right-2 top-2 text-right text-blue-500 text-xl hover:cursor-pointer h-5 hover:text-zinc-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Edit
                    </motion.p>
                  )}
                </AnimatePresence>
                <MovieTitle>{item.Name}</MovieTitle>
                {watched && <MovieReview>{item.Review}</MovieReview>}
                {watched && <MovieRating>{item.Rating}</MovieRating>}
              </Card>
            </a>
          ),
      )}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const MovieTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 font-bold tracking-wide mt-4 mb-4 text-center",
        className,
      )}
    >
      {children}
    </h4>
  );
};
export const MovieRating = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm text-center",
        className,
      )}
    >
      {children}/10
    </p>
  );
};
export const MovieReview = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "w-full h-32 border text-zinc-100 border-blue-500 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#D3D3D3] resize-none",
        className,
      )}
    >
      {children}
    </p>
  );
};

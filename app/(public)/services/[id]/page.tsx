const serviceById = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>Service by id page: {id}</div>;
};

export default serviceById;

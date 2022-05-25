/** @jsxImportSource @emotion/react */
import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  Button,
  FullPageSpinner,
  Link,
  PropertyCard,
  PropertyList,
  PropertyListItem,
} from "../../../../components/lib";
import { HouseService } from "../../../../services/properties/house.service";
import { IHouseProperty } from "../estimations/PropertyType";
/* eslint-disable */
export const SavedHouses = () => {
  const queryClient = useQueryClient();
  const houseService = new HouseService();

  const {
    data: savedHouses,
    isLoading,
    isSuccess,
  }: {
    data?: IHouseProperty[];
    isLoading: boolean;
    isSuccess: boolean;
  } = useQuery("savedHouses", () => houseService.getAll());

  const { mutate: remove } = useMutation(
    ({ id }: { id: string }) => houseService.delete(id),
    {
      onMutate(removedProperty) {
        const previousProperties = queryClient.getQueriesData("savedHouses");

        queryClient.setQueriesData("savedHouses", (old: any) => {
          return old.filter(
            (property: IHouseProperty) => property._id !== removedProperty.id
          );
        });

        return () =>
          queryClient.setQueriesData("savedHouses", previousProperties);
      },
      onSuccess: () => queryClient.invalidateQueries("savedHouses"),
      onError: (err, variables, recover) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        typeof recover === "function" ? recover() : null,
    }
  );

  //To do : style the list of saved properties

  return (
    <div>
      {isLoading && <FullPageSpinner />}
      <h2
        css={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "2rem" }}
      >
        Estimated Houses
      </h2>
      {isSuccess && savedHouses?.length !== 0 ? (
        <PropertyList>
          {savedHouses?.map((house: IHouseProperty) => (
            <PropertyListItem key={house._id}>
              <PropertyCard>
                <header className="card-header">
                  <p className="card-header-title">
                    <b>
                      Addresse : {house.rue}, {house.code_postal} {house.ville}
                    </b>
                  </p>
                </header>
                <div
                  css={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <div>
                    <p>Area : {house.surface_totale_terrain}m²</p>
                  </div>
                  <div>
                    <p>Construction Year : {house.annee_construction}</p>
                  </div>
                </div>
                <Button
                  css={{ width: "100%" }}
                  variant="danger"
                  onClick={() => remove({ id: house._id })}
                >
                  Delete
                </Button>
              </PropertyCard>
            </PropertyListItem>
          ))}
        </PropertyList>
      ) : (
        <div>
          <p>
            You don't have any estimations for now
            <Link css={{ marginLeft: "1rem" }} to="/house">
              new Estimation
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};